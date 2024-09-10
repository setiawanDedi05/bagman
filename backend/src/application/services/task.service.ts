import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { TaskRepository } from 'src/infrastructure/repositories/task.repository';
import { NotificationService } from './notification.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ProjectRepository } from 'src/infrastructure/repositories/project.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const project = await this.projectRepository.findProjectById(
      createTaskDto.projectId,
    );
    const createdBy = await this.userRepository.findById(
      createTaskDto.createdBy,
    );
    const task = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      priority: createTaskDto.priority,
      label: createTaskDto.label,
      project,
      createdBy,
    };
    return await this.taskRepository.createTask(task);
  }

  async findAll(offset: number) {
    return await this.taskRepository.findAllTasks(offset);
  }

  async findOne(id: string) {
    try {
      const task = await this.taskRepository.findTaskById(id);
      if (!task) throw new NotFoundException(`Task with id ${id} not found`);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async findByAssigneesId(id: string, status: string) {
    try {
      const tasks = await this.taskRepository.getTotalMyTask(id, status);
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getRecentTask(id: string) {
    try {
      const tasks = await this.taskRepository.recentTask(id);
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const project = await this.projectRepository.findProjectById(
      updateTaskDto.projectId,
    );
    const assignees = await this.userRepository.findById(
      updateTaskDto.assignees,
    );
    const task = {
      title: updateTaskDto.title,
      description: updateTaskDto.description,
      status: updateTaskDto.status,
      priority: updateTaskDto.priority,
      label: updateTaskDto.label,
      project,
      assignees,
    };
    return await this.taskRepository.updateTask(id, task);
  }

  async remove(id: string) {
    await this.taskRepository.deleteTask(id);
  }

  async countTasksThisMonth(): Promise<number> {
    return this.taskRepository.countTasksThisMonth();
  }
}
