"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const kafkajs_1 = require("kafkajs");
const ws_1 = require("ws");
const app = (0, express_1.default)();
const redis = new ioredis_1.default();
const kafka = new kafkajs_1.Kafka({
    clientId: "chat-app",
    brokers: ["localhost:9092"]
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "chat-group" });
const wss = new ws_1.WebSocketServer({ port: 8080 });
let clients = new Map();
wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[1];
    clients.set(userId, ws);
    console.log(ws);
    ws.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const parsedMessage = JSON.parse(message.toString());
        parsedMessage.from = userId;
        yield producer.send({
            topic: "chat-messages",
            messages: [{ value: JSON.stringify(parsedMessage) }]
        });
    }));
    ws.on("close", () => clients.delete(userId));
}));
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: "chat-messages" });
    yield consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ message }) {
            if (!message.value)
                return;
            const msg = JSON.parse(message.value.toString());
            if (clients.has(msg.to)) {
                clients.get(msg.to).send(JSON.stringify(msg));
            }
            console.log(msg);
            redis.set(`chat:${msg.from}:${msg.to}`, JSON.stringify(msg));
        })
    });
});
app.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.connect();
    yield runConsumer();
}));
