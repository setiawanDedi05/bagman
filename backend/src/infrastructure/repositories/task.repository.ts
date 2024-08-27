import { Task } from "src/domain/entities/task.entity";
import { DataSource, Repository } from "typeorm";

export class TaskRepository extends Repository<Task>{
    constructor(private datasource: DataSource){
        super(Task, datasource.createEntityManager());
    }
}