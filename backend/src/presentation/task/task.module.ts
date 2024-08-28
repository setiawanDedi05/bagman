import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from 'src/application/services/task.service';
import { TaskRepository } from 'src/infrastructure/repositories/task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})
export class TaskModule {}