import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { LoginDto } from 'src/application/dto/auth/login.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username);
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
      accessToken: this.jwtService.sign(payload),
      user
    };
  }

  async register(requestData: RegisterDto) {
    const { username, password, email } = requestData;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const user = await this.userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      const verificationToken = this.jwtService.sign(
        { email: user.email, sub: user.id },
        { expiresIn: '1h' },
      );

      await this.emailService.sendVerificationEmail(
        user.email,
        verificationToken,
      );

      return { message: 'User Registered Successfully' };
    } catch (error) {
      throw error;
    }
  }
}
