import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
});

export const login = async (username: string, password: string) => {
  return api.post("/auth/login", { username, password });
};

export default api;
