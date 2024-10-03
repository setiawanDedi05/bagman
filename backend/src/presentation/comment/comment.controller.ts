import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from 'src/application/services/comment.service';
import { JwtAuthCookieGuard } from 'src/common/middleware/jwt-cookie.middleware';
import { Comment } from 'src/domain/entities/comment.entity';

@Controller('comments')
@UseGuards(JwtAuthCookieGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createTaskRequest: Partial<Comment>) {
    return this.commentService.create(createTaskRequest);
  }
}
