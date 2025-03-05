import { createContext, useContext, useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

interface SocketContextType{
    socket:WebSocket | null
}

const socketContext = createContext<SocketContextType>({socket:null})

export const SocketProvider = ({children}:{children: React.ReactNode}) => {
    const [socket,setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => console.log("Connected to WS");
        ws.onclose = () => console.log("Desconnected from WS");
        
        socket(ws);

        return()=>{
            ws.close();
        };
    },[]);

    return(
        <SocketProvider.Provider value={{socket}}>
            {children}
        </SocketProvider.Provider>
    );
}
export const useSocket = () => useContext(socketContext);