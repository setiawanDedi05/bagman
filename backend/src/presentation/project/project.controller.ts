import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthCookieGuard } from 'src/common/middleware/jwt-cookie.middleware';
import { ProjectService } from 'src/application/services/project.service';
import { CreateProjectDto } from 'src/application/dto/project/create-project.dto';
import { UpdateProjectDto } from 'src/application/dto/project/update-project.dto';

@Controller('projects')
@UseGuards(JwtAuthCookieGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createTaskRequest: CreateProjectDto) {
    return this.projectService.create(createTaskRequest);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectRequest: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
