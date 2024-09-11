import { api } from "../api";
import { endpoint } from "../endpoints";

export const userService = {
  searchPeople: async (username: string) => {
    return await api.get(`${endpoint.user.parent}?username=${username}`);
  },
};
