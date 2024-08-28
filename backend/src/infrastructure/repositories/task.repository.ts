import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/application/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/application/dto/task/update-task.dto';
import { Task } from 'src/domain/entities/task.entity';
import { ITaskRepository } from 'src/domain/interface/task.repository.interface';
import { Repository } from 'typeorm';

export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findTaskById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.findTaskById(id);
  }

  async deleteTask(id: string): Promise<Task> {
    const task = this.findTaskById(id);
    await this.taskRepository.delete(id);
    return task;
  }
}
