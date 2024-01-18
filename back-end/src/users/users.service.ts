import { Body, ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './domain/user.domain';
import { UsersRepository } from './repositories/users.repository';
import { ConflictError } from 'src/base/conflictError';
import { IllegalArgumentError } from 'src/base/argumentError';

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

    if (user) {
      throw new ConflictError('User already exists!');
    }

    const newUser = new User({
      ...createUserDto,
      role: Role.User,
    });

    return await this.usersRepository.create(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.getAll();
  }

  async findOne(id: string) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.usersRepository.get(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    //Comprobar si existe el usuario
    const user = await this.usersRepository.get(id);

    const updateUser = new User({
      ...user,
      ...updateUserDto,
    });

    return await this.usersRepository.update(id, updateUser);
  }

  async remove(id: string): Promise<User> {
    if  (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.usersRepository.delete(id);
  }

  async getByName(name: string): Promise<User> {
    if (name === null || name.trim() === '') {
      throw new IllegalArgumentError('El nombre del usuario no puede ser vacio');
    }

    return await this.usersRepository.getByName(name);
  }
}
