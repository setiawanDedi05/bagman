import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { Task } from './domain/entities/task.entity';
import { AuthModule } from './presentation/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TaskModule } from './presentation/task/task.module';
import { FirebaseAdminModule } from './firebase-admin.module';
import { Project } from './domain/entities/project.entity';
import { ProjectModule } from './presentation/project/project.module';
import { UserModule } from './presentation/user/user.module';
import { CommentModule } from './presentation/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: process.cwd() + '/src/templates/email',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Task, Project],
      synchronize: true,
    }),
    FirebaseAdminModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    UserModule,
    CommentModule,
  ],
})
export class AppModule {}
