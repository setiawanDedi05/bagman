import { api } from "../api";
import { CreateProjectRequest } from "../dto/project-dto";
import { endpoint } from "../endpoints";

export const projectsService = {
  allProject: async () => {
    return await api.get(endpoint.projects.fetchAll);
  },
  createProject: async (request: CreateProjectRequest) => {
    return await api.post(endpoint.projects.parent, request);
  },
};
