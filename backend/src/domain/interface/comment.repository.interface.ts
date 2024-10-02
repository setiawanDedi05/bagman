import { Comment } from '../entities/comment.entity';

export interface ICommentsRepository {
  create(comment: Partial<Comment>): Promise<Comment>;
  findCommentsByTaskId(taskId: string): Promise<Comment[]>;
}
