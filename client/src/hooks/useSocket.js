import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [online, setOnline] = useState(false);

  // Memoize the socket to avoid recreating it on every render
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath],
  );

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    setOnline(socket.connected);

    socket.on("connect", () => {
      setOnline(true);
    });

    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};
