import { Injectable } from "@nestjs/common";
import { Task } from "src/domain/entities/task.entity";
import { User } from "src/domain/entities/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class TaskService {
    constructor(private readonly dataSource: DataSource){}
    
    private taskRepository = this.dataSource.getRepository(Task);

    createTask(title: string, description: string, user: User): Promise<Task>{
        const task = this.taskRepository.create({title, description, user});
        return this.taskRepository.save(task);
    }

    findTasksByUser(user: User):Promise<Task[]>{
        return this.taskRepository.find({where: {user}});
    }

    async completeTask(taskId: string): Promise<Task>{
        const task = await this.taskRepository.findOneBy({id:taskId});
        if(task){
            task.completed = true;
            return this.taskRepository.save(task);
        }
        return null;
    }
}