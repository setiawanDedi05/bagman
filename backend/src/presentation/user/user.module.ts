import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from 'src/domain/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from 'src/application/services/user.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
