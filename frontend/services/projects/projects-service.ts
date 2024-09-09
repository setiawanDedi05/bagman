import { api } from "../api";
import { CreateProjectRequest, UpdateProjectRequest } from "../dto/project-dto";
import { endpoint } from "../endpoints";

export const projectsService = {
  allProject: async () => {
    return await api.get(endpoint.projects.fetchAll);
  },
  createProject: async (request: CreateProjectRequest) => {
    return await api.post(endpoint.projects.parent, request);
  },
  findProject: async (id: string) => {
    return await api.get(`${endpoint.projects.parent}/${id}`);
  },
  deleteProject: async (id: string) => {
    return await api.delete(`${endpoint.projects.parent}/${id}`);
  },
  updateProject: async (request: UpdateProjectRequest, id: string) => {
    return await api.patch(`${endpoint.projects.parent}/${id}`, request);
  },
};
