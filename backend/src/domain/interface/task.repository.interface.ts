import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  createTask(task: Partial<Task>): Promise<Task>;
  findTaskById(id: string): Promise<Task | undefined>;
  findAllTasks(): Promise<Task[]>;
  updateTask(id: string, updateTaskData: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<Task>;
}

