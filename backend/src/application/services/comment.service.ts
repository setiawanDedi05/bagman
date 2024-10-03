import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/infrastructure/repositories/comment.repository';
import { Comment } from 'src/domain/entities/comment.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRespository: CommentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(request: Partial<Comment>) {
    try {
      const response = await this.commentRespository.create(request);
      const user = await this.userRepository.findById(response.userId);
      response.user = user;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
