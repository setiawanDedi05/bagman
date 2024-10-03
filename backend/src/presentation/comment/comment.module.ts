import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Comment } from 'src/domain/entities/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from 'src/application/services/comment.service';
import { CommentRepository } from 'src/infrastructure/repositories/comment.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    AuthModule,
    UserModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
  ],
  exports: [CommentService],
})
export class CommentModule {}
