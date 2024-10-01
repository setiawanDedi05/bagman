import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from 'src/application/services/comment.service';
import { JwtAuthCookieGuard } from 'src/common/middleware/jwt-cookie.middleware';

@Controller('tasks')
@UseGuards(JwtAuthCookieGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createTaskRequest) {
    return this.commentService.create();
  }
}
