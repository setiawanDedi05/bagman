import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from 'src/application/services/task.service';
import { CreateTaskDto } from 'src/application/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/application/dto/task/update-task.dto';
import { JwtAuthCookieGuard } from 'src/common/middleware/jwt-cookie.middleware';

@Controller('tasks')
@UseGuards(JwtAuthCookieGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/count-this-month')
  async countTasksThisMonth(): Promise<number> {
    return await this.taskService.countTasksThisMonth();
  }

  @Get('search')
  findByAssigneesId(@Query('assignees') id: string, @Query('status') status: string) {
    return this.taskService.findByAssigneesId(id, status);
  }

  @Get('recent-task/:id')
  recenTask(@Param('id') id: string) {
    return this.taskService.getRecentTask(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
