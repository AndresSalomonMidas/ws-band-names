import { createContext, useMemo } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket("http://localhost:8080");

  const value = useMemo(() => ({ socket, online }), [socket, online]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
