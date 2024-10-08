import { api } from "../api";
import { endpoint } from "../endpoints";

export const dashboardService = {
  allProject: async () => {
    return await api.get(endpoint.projects.fetchAll);
  },

  getTotalTask: async (id: string, status: string) => {
    return await api.get(
      `${endpoint.tasks.fetchTaskMine}?assignees=${id}&status=${status}`
    );
  },

  getRecentTask: async (id: string) => {
    return await api.get(`${endpoint.tasks.recenTask}/${id}`);
  },

  countThisMont: async (id: string) => {
    return await api.get(`${endpoint.tasks.countThisMonth}/${id}`);
  },
};
