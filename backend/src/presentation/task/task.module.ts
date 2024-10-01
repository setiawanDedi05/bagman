import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from 'src/application/services/task.service';
import { TaskRepository } from 'src/infrastructure/repositories/task.repository';
import { AuthModule } from '../auth/auth.module';
import { NotificationService } from 'src/application/services/notification.service';
import { Project } from 'src/domain/entities/project.entity';
import { ProjectRepository } from 'src/infrastructure/repositories/project.repository';
import { EmailService } from 'src/application/services/email.service';
import { TasksGateway } from './task.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    EmailService,
    TaskRepository,
    NotificationService,
    ProjectRepository,
    TasksGateway,
  ],
  exports: [TaskService],
})
export class TaskModule {}
