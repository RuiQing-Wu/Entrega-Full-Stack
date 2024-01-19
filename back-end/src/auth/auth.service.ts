import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUserService } from 'src/users/interfaces/user.service.interface';

@Injectable()
export class AuthService {

  constructor(
    private usersService: IUserService,
    private jwtService: JwtService
  ) { }

  async signIn(username, pass) {
    if (username === null || username.trim() === '') {
      throw new IllegalArgumentError( 'El nombre de usuario no puede ser vacio' );
    }

    if (pass === null || pass.trim() === '') {
      throw new IllegalArgumentError( 'La contraseña no puede ser vacia' );
    }

    let user = null;
    try {
      user = await this.usersService.getByName(username);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }
    }

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async getProfile(username: string) {
    if (username === null || username.trim() === '') {
      throw new IllegalArgumentError( 'El nombre de usuario no puede ser vacio' );
    }

    const user = await this.usersService.getByName(username);
    return user;
  }
}