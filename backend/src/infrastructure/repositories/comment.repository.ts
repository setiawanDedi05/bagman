import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/entities/comment.entity';
import { ICommentsRepository } from 'src/domain/interface/comment.repository.interface';
import { Repository } from 'typeorm';

export class CommentRepository implements ICommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  
  async create(comment: Partial<Comment>): Promise<Comment> {
    const newComment = await this.commentRepository.create(comment);
    return await this.commentRepository.save(newComment);
  }

  async findCommentsByTaskId(taskId: string): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { taskId } });
  }
}
