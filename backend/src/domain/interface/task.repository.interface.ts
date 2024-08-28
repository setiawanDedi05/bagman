import { CreateTaskDto } from 'src/application/dto/task/create-task.dto';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from 'src/application/dto/task/update-task.dto';

export interface ITaskRepository {
  createTask(createTaskDto: CreateTaskDto): Promise<Task>;
  findAllTasks(): Promise<Task[]>;
  findTaskById(id: string): Promise<Task>;
  updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
  deleteTask(id: string): Promise<Task>;
}

