import { api } from "../api";
import { CreateTaskRequest, UpdateTaskRequest } from "../dto/task-dto";
import { endpoint } from "../endpoints";

export const tasksService = {
  allTask: async (page: string) => {
    return await api.get(`${endpoint.tasks.parent}?page=${page}`);
  },
  createTask: async (request: CreateTaskRequest) => {
    return await api.post(endpoint.tasks.parent, request);
  },
  detailTask: async (id: string) => {
    return await api.get(`${endpoint.tasks.parent}/${id}`);
  },
  deleteTask: async (id: string) => {
    return await api.delete(`${endpoint.tasks.parent}/${id}`);
  },
  updateTask: async (request: UpdateTaskRequest, id: string) => {
    return await api.patch(`${endpoint.tasks.parent}/${id}`, request);
  },
};
