import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/domain/entities/project.entity';
import { IProjectRepository } from 'src/domain/interface/project.repository.interface';
import { Repository } from 'typeorm';

export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(task: Partial<Project>): Promise<Project> {
    const newProject = await this.projectRepository.create(task);
    return await this.projectRepository.save(newProject);
  }

  async findProjectById(id: string): Promise<Project | undefined> {
    return await this.projectRepository.findOne({ where: { id } });
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({relations: ["tasks", "owner"]});
  }

  async updateProject(
    id: string,
    updateProjectData: Partial<Project>,
  ): Promise<Project> {
    try {
      await this.projectRepository.update(id, {
        title: updateProjectData.title,
        description: updateProjectData.description,
      });
      return await this.findProjectById(id);
    } catch (error) {
      console.log({ error });
    }
  }

  async deleteProject(id: string): Promise<Project> {
    try {
      const findedProject = await this.findProjectById(id);
      if (!findedProject)
        throw new NotFoundException(`Project with ${id} not found`);
      await this.projectRepository.delete(id);
      return findedProject;
    } catch (error) {
      throw error;
    }
  }
}
