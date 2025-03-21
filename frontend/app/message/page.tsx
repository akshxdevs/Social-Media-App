"use client"
import { useEffect, useState } from "react";

const ChatApp = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ from: string; to: string; text: string }[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(()=>{
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  })
  


  useEffect(() => {
    if (userId) {
      const ws = new WebSocket(`ws://localhost:8080?${userId}`);
      setSocket(ws);

      ws.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, receivedMessage]);
      };

      ws.onclose = () => console.log("WebSocket Disconnected");
      return () => ws.close();
    }
  }, [userId]);

  const sendMessage = () => {
    if (socket && message.trim() && receiverId) {
      const msg = { from: userId, to: receiverId, text: message };
      socket.send(JSON.stringify(msg));
      setMessages((prev) => [...prev, msg]);
      setMessage("");
    }
  };


  return <div>
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="">
                <div className="w-full max-w-md border p-4 rounded">
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Receiver ID"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <div className="h-60 overflow-auto border p-2 mb-2">
                    {messages.map((msg, index) => (
                    <div key={index} className={`p-1 ${msg.from === userId ? "text-right" : "text-left"}`}>
                        <b>{msg.from}: </b> {msg.text}
                    </div>
                    ))}
                </div>
                <input
                    className="border p-2 w-full"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 w-full mt-2" onClick={sendMessage}>
                    Send
                </button>
                </div>
        </div>
    </div>
  </div>
};

export default ChatApp;
