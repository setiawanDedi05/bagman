import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LabelTask } from 'src/domain/enum/label.-task.enum';
import { PriorityTask } from 'src/domain/enum/priority-task.enum';
import { TaskStatus } from 'src/domain/enum/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: created, onprogress, done',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(PriorityTask, {
    message: 'Priority must be one of: low, medium, high',
  })
  priority?: TaskStatus;

  @IsOptional()
  @IsEnum(LabelTask, {
    message: 'Label must be one of: feature, documentation, bug',
  })
  label?: TaskStatus;

  @IsOptional()
  projectId?: string;

  @IsOptional()
  assignees?: string;
}
