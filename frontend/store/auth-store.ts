"use client";

import { User } from "@/services/dto/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setSeason: (user: User) => void;
  removeSeason: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? (JSON.parse(sessionStorage.getItem("user") || "{}") as User)
      : null,
  setSeason: (request) => {
    set(() => ({ user: request }));
    sessionStorage.setItem("user", JSON.stringify(request));
  },
  removeSeason: () => sessionStorage.clear(),
}));
