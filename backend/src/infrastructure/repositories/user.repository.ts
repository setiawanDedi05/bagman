import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interface/user.repository.interface';
import { Like, Repository } from 'typeorm';
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(user: User): Promise<any> {
    return await this.userRepository.update(user.id, user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    return await this.userRepository.save(registerDto);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async findAll(username?: string): Promise<User[]> {
    const response = await this.userRepository.find({
      where: {
        username: Like(`%${username}%`),
      },
      take: 10,
    });
    return response;
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateFcmToken(id: string, token: string): Promise<void> {
    await this.userRepository.update(id, { fcmToken: token });
  }
}
