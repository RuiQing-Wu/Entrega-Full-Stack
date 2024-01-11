import { Body, ConflictException, Inject, Injectable } from '@nestjs/common';
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
export class UsersServiceImpl implements IUserService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {

  }

  async create(createUserDto: CreateUserDto) {
    // Comprobar si existe el usuario
    const user = await this.usersRepository.getByName(createUserDto.username);

    console.log(user);
    if (user) {
      throw new ConflictException('User already exists!');
    }

    const newUser = new User({
      ...createUserDto,
      role: Role.User,
    });

    return this.usersRepository.create(newUser);
  }

  findAll(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string) {
    return this.usersRepository.get(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {

    //Comprobar si existe el usuario
    const user = this.usersRepository.get(id);

    if (!user) {
      throw new ConflictException('User does not exists!');
    }
    
    const updateUser = new User({
      ...updateUserDto,
    });

    return this.usersRepository.update(id, updateUser);
  }

  remove(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getByName(name: string): Promise<User> {
    return this.usersRepository.getByName(name);
  }
}
