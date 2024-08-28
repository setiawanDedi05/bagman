import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TaskService } from "src/application/services/task.service";
import { CreateTaskDto } from "src/application/dto/task/create-task.dto";
import { UpdateTaskDto } from "src/application/dto/task/update-task.dto";

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController{
    constructor(
        private readonly taskService: TaskService
    ){}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto){
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll(){
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.taskService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, updateTaskDto: UpdateTaskDto){
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.taskService.remove(id);
    }

}