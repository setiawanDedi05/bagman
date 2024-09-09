import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ProjectRepository } from 'src/infrastructure/repositories/project.repository';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createProjectData: CreateProjectDto) {
    const user = await this.userRepository.findById(createProjectData.userId);
    const project = {
      title: createProjectData.title,
      description: createProjectData.description,
      key: createProjectData.key,
      owner: user,
    };
    return await this.projectRepository.createProject(project);
  }

  async findAll() {
    return await this.projectRepository.findAllProjects();
  }

  async findOne(id: string) {
    try {
      const task = await this.projectRepository.findProjectById(id);
      if (!task) throw new NotFoundException(`Task with id ${id} not found`);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateProjectData: UpdateProjectDto) {
    return await this.projectRepository.updateProject(id, updateProjectData);
  }

  async remove(id: string) {
    return await this.projectRepository.deleteProject(id);
  }
}
