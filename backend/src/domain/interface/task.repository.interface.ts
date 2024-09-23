import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  createTask(task: Partial<Task>): Promise<Task>;
  findTaskById(id: string): Promise<Task | undefined>;
  findAllTasks(
    offset: number,
  ): Promise<{ content: Task[]; total_data: number }>;
  getTotalMyTask(assigneesId: string, status: string): Promise<number>;
  updateTask(id: string, updateTaskData: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<Task>;
  recentTask(id: string): Promise<Task[]>;
  countTasksThisMonth(id: string): Promise<number>;
}
