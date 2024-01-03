import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './domain/user.domain';
import { UsersRepository } from './repositories/users.repository';

export enum Role {
  User = 'user',
  Admin = 'admin',
}
@Injectable()
export class UsersServiceImp extends IUserService {
  
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super();
  }

  create(createUserDto: CreateUserDto) {
    const user = new User({
      role: Role.User,
      ...createUserDto,
    });

    return this.usersRepository.create(user);
  }

  findAll(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string) {
    return this.usersRepository.get(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getByName(name: string): Promise<User> {
    return this.usersRepository.getByName(name);
  }
}
