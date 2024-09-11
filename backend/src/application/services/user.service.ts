import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(username?: string) {
    return await this.userRepository.findAll(username);
  }
}
