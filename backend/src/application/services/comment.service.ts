import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/infrastructure/repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRespository: CommentRepository) {}

  async create() {
    try {
      const response = await this.commentRespository.create();
    } catch (error) {
      throw error;
    }
  }
}
