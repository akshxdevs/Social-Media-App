import express from "express";
import cors from "cors";
import { WebSocketServer, WebSocket } from 'ws';
const app = express();

app.use(express.json());
app.use(cors());


const PORT = 8080;
const server = new WebSocketServer({ port: PORT });

server.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    
    ws.on('message', (message: string) => {
        console.log(`Received: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);




app.listen(3000);