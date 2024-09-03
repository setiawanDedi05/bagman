import { api } from "../api";
import { CreateTaskRequest } from "../dto/task-dto";
import { endpoint } from "../endpoints";

export const tasksService = {
  allTask: async () => {
    return await api.get(endpoint.tasks.parent);
  },
  createTask: async (request: CreateTaskRequest) => {
    return await api.post(endpoint.tasks.parent, request);
  },
};
