import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LabelTask } from 'src/domain/enum/label.-task.enum';
import { PriorityTask } from 'src/domain/enum/priority-task.enum';
import { TaskStatus } from 'src/domain/enum/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: backlog, onprogress, done',
  })
  status: TaskStatus;

  @IsNotEmpty()
  @IsEnum(PriorityTask, {
    message: 'priority must be one of: low, medium, high',
  })
  priority: TaskStatus;

  @IsNotEmpty()
  @IsEnum(LabelTask, {
    message: 'Label must be one of: feature, documentation, bug',
  })
  label: TaskStatus;

  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  assignees: string[];
}
