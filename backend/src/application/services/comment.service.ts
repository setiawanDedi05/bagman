import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/infrastructure/repositories/comment.repository';
import { Comment } from 'src/domain/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRespository: CommentRepository) {}

  async create(request: Partial<Comment>) {
    try {
      const response = await this.commentRespository.create(request);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
