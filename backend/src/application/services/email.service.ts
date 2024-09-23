import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class EmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: './verification',
      context: {
        name: email,
        url: verificationUrl,
      },
    });
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.userRepository.findByEmail(decoded.email);
      if (!user) {
        throw new Error('User not found');
      }

      // Update user as verified
      user.isEmailVerified = true;
      await this.userRepository.update(user);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async sendEmailToAssignees(
    email: string,
    name: string,
    title: string,
    reporter: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: `New Task Assigned: ${title}`,
      template: './notification-email',
      context: {
        name,
        title,
        reporter,
      },
    });
  }

  async sendEmailToOwner(
    email: string,
    name: string,
    title: string,
    assignees: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: `Task ${title} Assignment Notification`,
      template: './notification-to-owner',
      context: {
        name,
        title,
        assignees,
      },
    });
  }

  async sendEmailUpdateStatus(
    email: string,
    name: string,
    title: string,
    status: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: `Task ${title} Updated Status`,
      template: './notification-status-task-updated',
      context: {
        name,
        title,
        status,
      },
    });
  }
}
