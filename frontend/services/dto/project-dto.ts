import { User } from "./user";

export interface ProjectDTO {
  id: string;
  title: string;
  description: string;
  owner: User;
}

export interface CreateProjectRequest {
    title: string;
    description?:string;
    userId: string;
}
