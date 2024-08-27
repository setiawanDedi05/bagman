import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/presentation/auth/dto/register.dto';
import { LoginDto } from 'src/presentation/auth/dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
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
      accessToken: this.jwtService.sign(payload),
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

    try {
      const savedUser = await this.userRepository.save(user);
      const verificationToken = this.jwtService.sign({email: savedUser.email, sub: savedUser.id }, {expiresIn: '1h'});

      await this.sendVerificationEmail(savedUser.email, verificationToken);

      return { message: 'User Registered Successfully' };
    } catch (error) {
      console.log({error: error.detail})
      throw error
    }

    // Implement email verification process here
    // e.g., send verification email and store token in database
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: './verification',
      context: {
        name: email,
        url: verificationUrl
      }
    });
  }

   async verifyEmail(token: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.userRepository.findOne({ where: { email: decoded.email } });
      if (!user) {
        throw new Error('User not found');
      }

      // Update user as verified
      user.isEmailVerified = true;
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
