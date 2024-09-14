import { api } from "../api";
import { endpoint } from "../endpoints";

export const userService = {
  searchPeople: async (username: string) => {
    return await api.get(`${endpoint.user.parent}?username=${username}`);
  },

  updateFcmToken: async (id: string, token: string) => {
    return await api.post(endpoint.user.updateFcmToken, { id, token });
  },
};
