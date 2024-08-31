import { User } from "@/services/auth/dto/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setSeason: (user: User) => void;
  removeSeason: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setSeason: (request) => set({ user: request }),
  removeSeason: () => set({ user: null }),
}));
