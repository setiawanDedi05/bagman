import { User } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository extends Repository<User>{}