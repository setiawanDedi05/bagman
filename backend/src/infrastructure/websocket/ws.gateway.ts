import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentService } from 'src/application/services/comment.service';
import { TaskService } from 'src/application/services/task.service';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly tasksService: TaskService,
    private readonly commentsService: CommentService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.server.emit('user-joined', {
      message: `user joined: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    this.server.emit('user-left', {
      message: `user left: ${client.id}`,
    });
  }

  @SubscribeMessage('assignTask')
  async handleAssignToMe(@MessageBody() payload: any) {
    const response = await this.tasksService.assignToMe(
      payload.id,
      payload.assignees,
    );
    if (response) {
      this.server.emit('taskAssigned', response);
    }
  }

  @SubscribeMessage('createComment')
  async handleCreateComment(@MessageBody() data: any) {
    const comment = await this.commentsService.create({
      taskId: data.taskId,
      userId: data.userId,
      content: data.content,
    });
    this.server.emit('commentCreated', comment);
  }
}
