import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/presentation/auth/dto/register.dto';
import { LoginDto } from 'src/presentation/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  private userRepository = this.dataSource.getRepository(User);

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(requestData: LoginDto) {
    const { username, password } = requestData;
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(requestData: RegisterDto) {
    const { username, password, email } = requestData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    // Implement email verification process here
    // e.g., send verification email and store token in database

    return { message: 'User Registered Successfully' };
  }

  async verifyEmail(token: string) {
    // Implement email verification logic
    // e.g., find user by token, mark as verified
    return { message: 'Email verified successfully' };
  }
}
