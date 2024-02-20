
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserDto {
    username: string;
    password: string;
    nombre: string;
    telefono: string;
    ciudad: string;
    pais: string;
    role: string;
}

export class User {
    id: string;
    username: string;
    password: string;
    nombre: string;
    telefono: string;
    ciudad: string;
    pais: string;
    role: string;
}

export abstract class IQuery {
    abstract allUsers(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract userByUsername(username: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(username: string, password: string, nombre: string, telefono: string, ciudad: string, pais: string): User | Promise<User>;

    abstract createUserDto(createUserDto: CreateUserDto): User | Promise<User>;
}

type Nullable<T> = T | null;
