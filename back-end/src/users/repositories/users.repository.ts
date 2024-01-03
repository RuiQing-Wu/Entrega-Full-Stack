import { IGenericRepository } from "src/base/generic.repository";
import { User } from "../domain/user.domain";

export abstract class UsersRepository extends IGenericRepository<User> {
    abstract getByName(name: string): Promise<User>;
}

