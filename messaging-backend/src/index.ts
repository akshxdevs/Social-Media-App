import express from "express";
import Redis from "ioredis";
import { Kafka } from "kafkajs";
import { RawData, WebSocketServer } from "ws";
const app = express();
const PORT = process.env.PORT || 5000
const redis = new Redis();

const wss = new WebSocketServer({port:8080})
const client = new Map();

const kafka = new Kafka({clientId:"chat-app",brokers:["localhost:9093"]});
const producer = kafka.producer();
const consumer = kafka.consumer({groupId:"chat-group"});
wss.on("connection",(ws,req)=>{
    const userId = req.url ? req.url.split("?")[1] : null;
    if (!userId) return ws.close();
    console.log(ws);
    client.set(userId,ws)
    
    ws.on("message",async(message:RawData)=>{
        const parsedMessage = JSON.parse(message.toString());
        parsedMessage.from = userId;

        await producer.send({
            topic:'chat-messages',
            messages:[{value:JSON.stringify(parsedMessage)}]
        })
    });
});

const runConsumer = async() => {
    try {
        await consumer.connect();
        await consumer.subscribe({topic:"chat-messages"});
        await consumer.run({
            eachMessage:async({message})=>{
                if (!message.value) return
                const msg = JSON.parse(message.value.toString())
                if (client.has(msg.to)) {
                    client.get(msg.to).send(JSON.stringify(msg))
                }
                redis.set(`chat:${msg.from}:${msg.to}`,JSON.stringify(msg))
            }
        })
    } catch (error) {
        console.error("Kafka Consumer Error!!",error);
        
    }
}

app.listen(PORT,async()=>{
    console.log(`server running on port ${PORT}`);
    await producer.connect();
    await runConsumer();
})