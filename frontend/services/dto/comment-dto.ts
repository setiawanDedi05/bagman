import { User } from "./user";

export interface CommentDTO {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

export interface CommentRequest {
  content: string;
  taskId: string;
  userId: string;
}
