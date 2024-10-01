import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/entities/comment.entity';
import { ICommentsRepository } from 'src/domain/interface/comment.repository.interface';
import { Repository } from 'typeorm';

export class CommentRepository implements ICommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async create(): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id: "1" } });
  }
}
