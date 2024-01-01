import { IGenericRepository } from "src/base/generic.repository";
import { User } from "../users.service";

export abstract class UsersRepository extends IGenericRepository<User> {
    abstract getByName(name: string): Promise<User>;
}

