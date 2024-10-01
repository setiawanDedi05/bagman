"use client";
import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface WebsocketState {
  socket: Socket | null;
  init: () => void;
  close: () => void;
}

export const useWebsocket = create<WebsocketState>((set) => ({
  socket: null,
  init: () => {
    set(() => ({
      socket: io("http://localhost:3002", {
        transports: ["websocket"],
      }),
    }));
  },
  close: () => {
    set(() => ({
      socket: null,
    }));
  },
}));
