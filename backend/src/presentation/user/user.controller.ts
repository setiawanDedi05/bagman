import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(@Query("username") username: string) {
    return this.userService.findAll(username);
  }
}
