import { Comment } from "../entities/comment.entity";

export interface ICommentsRepository {
  create(): Promise<Comment>;
}
