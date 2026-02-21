"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "../AuthProvider";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:4000", { auth: { token } });
      socketRef.current = newSocket;

      newSocket.on("connect", () => setIsConnected(true));
      newSocket.on("disconnect", () => setIsConnected(false));
      newSocket.on("welcomeMessage", (data: string) => console.log(data));
      newSocket.on("userOnline", ({ userId }: { userId: string }) => console.log(`User ${userId} is online`));
      newSocket.on("userOffline", ({ userId }: { userId: string }) => console.log(`User ${userId} is offline`));

      return () => {
        newSocket.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
}