import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

export enum Role {
  User = 'user',
  Admin = 'admin',
}
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      role: Role.Admin,
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      role: Role.User,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
