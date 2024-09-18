import {
  Body,
  Controller,
  Get,
  Post,
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

  @Post("fcm-token-update")
  async updateFcmToken(@Body() data: {id:string, token: string}){
    this.userService.updateFcmToken(data.id, data.token);
  }
}
