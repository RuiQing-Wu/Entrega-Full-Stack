import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../domain/user.domain';

export abstract class IUserService {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract remove(id: string): Promise<User>;
  abstract getByName(name: string): Promise<User>;
}
