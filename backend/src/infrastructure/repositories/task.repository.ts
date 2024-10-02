import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { ITaskRepository } from 'src/domain/interface/task.repository.interface';
import { Between, Repository } from 'typeorm';

export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async findAllTasks(
    offset: number,
  ): Promise<{ content: Task[]; total_data: number }> {
    const response = await this.taskRepository.findAndCount({
      where: { project: { isDelete: false }, isDelete: false },
      order: {
        createdAt: 'desc',
      },
      take: 10,
      skip: offset,
      relations: ['project', 'assignees'],
    });
    return {
      content: response[0],
      total_data: response[1],
    };
  }

  async findTaskById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'project.owner', 'assignees', 'createdBy', 'comments'],
    });
  }

  async getTotalMyTask(assigneesId: string, status: string): Promise<number> {
    return await this.taskRepository.count({
      where: { assignees: { id: assigneesId }, status, isDelete: false },
    });
  }

  async updateTask(id: string, updateData: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, updateData);
    return await this.findTaskById(id);
  }

  async deleteTask(id: string): Promise<Task> {
    try {
      const findedTask = await this.findTaskById(id);
      if (!findedTask)
        throw new NotFoundException(`Project with ${id} not found`);
      await this.taskRepository.update(id, {
        isDelete: true,
      });
      return findedTask;
    } catch (error) {
      throw error;
    }
  }

  async recentTask(id: string): Promise<Task[]> {
    try {
      return await this.taskRepository.find({
        where: { assignees: { id }, isDelete: false, status: 'done' },
        order: {
          createdAt: 'DESC',
        },
        take: 5,
        relations: ['createdBy'],
      });
    } catch (error) {
      throw error;
    }
  }

  async countTasksThisMonth(id: string): Promise<number> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return this.taskRepository.count({
      where: {
        assignees: { id },
        isDelete: false,
        status: "done",
        createdAt: Between(startOfMonth, endOfMonth),
      },
    });
  }
}
