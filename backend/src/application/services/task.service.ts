import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { TaskRepository } from 'src/infrastructure/repositories/task.repository';
import { NotificationService } from './notification.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ProjectRepository } from 'src/infrastructure/repositories/project.repository';
import { EmailService } from './email.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService,
    private readonly projectRepository: ProjectRepository,
    @Inject('QUEUE_SERVICE') private readonly broker: ClientProxy,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const project = await this.projectRepository.findProjectById(
        createTaskDto.projectId,
      );
      const createdBy = await this.userRepository.findById(
        createTaskDto.createdBy,
      );
      const assignees = await this.userRepository.findById(
        createTaskDto.assignees,
      );

      const task = {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        priority: createTaskDto.priority,
        label: createTaskDto.label,
        project,
        createdBy,
        assignees,
      };
      const response = await this.taskRepository.createTask(task);
      if (response && assignees) {
        this.broker.emit('send_notification', {
          email: assignees.email,
          name: assignees.name,
          task: task.title,
          owner: project.owner.name,
        });
        console.log(this.broker, "ini")
        await this.emailService.sendEmailToAssignees(
          assignees.email,
          assignees.name,
          task.title,
          project.owner.name,
        );
        await this.notificationService.sendPushNotification(
          assignees.fcmToken,
          'New Task Assign to you',
          `I would like to inform you that a new task titled ${task.title} has been assigned to you by ${project.owner.name || project.owner.username}.`,
        );
      }
      return response;
    } catch (error) {
      throw error;
    }
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
    try {
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
      const response = await this.taskRepository.updateTask(id, task);
      if (response && assignees) {
        await this.emailService.sendEmailToAssignees(
          assignees.email,
          assignees.name,
          task.title,
          project.owner.name,
        );
        await this.notificationService.sendPushNotification(
          assignees.fcmToken,
          'New Task Assign to you',
          `Task ${task.title} in your project has been assigned to ${project.owner.name}.`,
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    await this.taskRepository.deleteTask(id);
  }

  async countTasksThisMonth(id: string): Promise<number> {
    return this.taskRepository.countTasksThisMonth(id);
  }

  async assignToMe(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const findedTask = await this.findOne(id);
      const assignees = await this.userRepository.findById(
        updateTaskDto.assignees,
      );
      const task = {
        assignees,
      };
      const response = await this.taskRepository.updateTask(id, task);
      if (response && assignees) {
        await this.emailService.sendEmailToOwner(
          findedTask.createdBy.email,
          findedTask.createdBy.name,
          findedTask.title,
          assignees.name,
        );
        await this.notificationService.sendPushNotification(
          findedTask.createdBy.fcmToken,
          'Task Update',
          `Task ${findedTask.title} in your project has been assigned to ${assignees.name}.`,
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async changeStatus(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const findedTask = await this.findOne(id);
      const task = {
        status: updateTaskDto.status,
      };
      const response = await this.taskRepository.updateTask(id, task);
      if (response) {
        await this.emailService.sendEmailUpdateStatus(
          findedTask.createdBy.email,
          findedTask.createdBy.name,
          findedTask.title,
          task.status,
        );
        await this.notificationService.sendPushNotification(
          findedTask.createdBy.fcmToken,
          'Task Update',
          `Task ${findedTask.title} in your project has been updated the status to ${task.status}.`,
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}
