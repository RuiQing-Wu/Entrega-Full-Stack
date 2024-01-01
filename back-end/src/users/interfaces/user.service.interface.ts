import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../users.service";

export abstract class IUserService {
    abstract create(createUserDto: CreateUserDto): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findOne(id: string): Promise<User>;
    abstract update(id: string, updateUserDto: UpdateUserDto);
    abstract remove(id: string): Promise<User>;
}