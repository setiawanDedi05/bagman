import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interface/user.repository.interface';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({id});
  }
}
