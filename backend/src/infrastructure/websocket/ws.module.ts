// src/websocket/websocket.module.ts
import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { TaskModule } from 'src/presentation/task/task.module';
import { CommentModule } from 'src/presentation/comment/comment.module';

@Module({
  imports: [TaskModule, CommentModule],
  providers: [WsGateway],
})
export class WebsocketModule {}
