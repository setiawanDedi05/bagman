import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/task/create-task.dto";
import { UpdateTaskDto } from "../dto/task/update-task.dto";
import { TaskRepository } from "src/infrastructure/repositories/task.repository";

@Injectable()
export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository
    ){}
    
    async create(createTaskDto: CreateTaskDto){
        return await this.taskRepository.createTask(createTaskDto);
    }

    async findAll(){
        return await this.taskRepository.findAllTasks();
    }

    async findOne(id: string){
        return await this.taskRepository.findTaskById(id);
    }

    async update(id: string, updateTaskDto: UpdateTaskDto){
        return await this.update(id, updateTaskDto);
    }

    async remove(id: string){
        return await this.taskRepository.deleteTask(id);
    }
}