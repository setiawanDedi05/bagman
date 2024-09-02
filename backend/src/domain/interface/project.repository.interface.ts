import { Project } from '../entities/project.entity';

export interface IProjectRepository {
  createProject(task: Partial<Project>): Promise<Project>;
  findProjectById(id: string): Promise<Project | undefined>;
  findAllProjects(): Promise<Project[]>;
  updateProject(id: string, updateProjectData: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<Project>;
}

