import { User } from "@/services/auth/dto/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setSeason: (user: User) => void;
  removeSeason: () => void;
}

export const useAuthStore = create<AuthState>(() => ({
  user: JSON.parse(sessionStorage.getItem("user") || "{}") as User,
  setSeason: (request) => sessionStorage.setItem("user", JSON.stringify(request)),
  removeSeason: () => sessionStorage.clear(),
}));
