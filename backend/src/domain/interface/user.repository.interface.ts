import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(registerDto: RegisterDto): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(username?: string): Promise<User[]>;
  update(user: User): Promise<any>;
}
