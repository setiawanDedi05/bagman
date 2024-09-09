import { Task } from "./task-dto";
import { User } from "./user";

export interface ProjectDTO {
  id: string;
  title: string;
  description: string;
  key: string;
  owner: User;
  tasks: Array<Task>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
  userId: string;
  key: string;
}

export interface UpdateProjectRequest {
  title: string;
  description?: string;
  key?: string;
}
