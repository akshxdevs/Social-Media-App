import express from "express";
import Redis from "ioredis";
import { Kafka } from "kafkajs";
import { RawData, WebSocketServer } from "ws";

const app = express()

const redis = new Redis()

const kafka = new Kafka({
    clientId:"chat-app",
    brokers:["localhost:9092"]
})

const producer = kafka.producer();
const consumer = kafka.consumer({groupId:"chat-group"});

const wss = new WebSocketServer({port:8080});
let clients = new Map();

wss.on("connection",async(ws,req)=>{
    const userId = req.url?.split("?")[1];
    clients.set(userId,ws)
    console.log(ws);

    ws.on("message",async(message:RawData)=>{
        const parsedMessage = JSON.parse(message.toString());
        parsedMessage.from = userId;
        await producer.send({
            topic:"chat-messages",
            messages:[{value:JSON.stringify(parsedMessage)}]
        });
    });

    ws.on("close",()=>clients.delete(userId))
});

const runConsumer = async() =>{
    await consumer.connect();
    await consumer.subscribe({topic:"chat-messages"});

    await consumer.run({
        eachMessage:async({message}) => {
            if (!message.value) return
            const msg = JSON.parse(message.value.toString());
            if (clients.has(msg.to)) {
                clients.get(msg.to).send(JSON.stringify(msg))
            }
            console.log(msg);
            redis.set(`chat:${msg.from}:${msg.to}`,JSON.stringify(msg))
        }
    })
}


app.listen(5000,async()=>{
    await producer.connect();
    await runConsumer();
});