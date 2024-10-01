import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {
  cors: {
    origin: '*'
  },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('user join ' + client.id);
    this.server.emit('user-joined', {
      message: `user joined: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('user left ' + client.id);
    this.server.emit('user-left', {
      message: `user left: ${client.id}`,
    });
  }

  @SubscribeMessage('assignTask')
  handleAssignToMe(@MessageBody() data: any) {
    this.server.emit('taskAssigned', data);
  }
}
