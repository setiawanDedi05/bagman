import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/application/services/auth.service';
import { User } from 'src/domain/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { EmailService } from 'src/application/services/email.service';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMQConfig } from 'src/config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'QUEUE_SERVICE',
        useClass: RabbitMQConfig
      }
    ]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, UserRepository, JwtStrategy],
  exports: [AuthService, JwtModule, UserRepository],
})
export class AuthModule {}
