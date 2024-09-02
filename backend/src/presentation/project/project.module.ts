import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/domain/entities/project.entity';
import { User } from 'src/domain/entities/user.entity';
import { ProjectController } from './project.controller';
import { ProjectRepository } from 'src/infrastructure/repositories/project.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ProjectService } from 'src/application/services/project.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User]), AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, UserRepository],
  exports: [],
})
export class ProjectModule {}
