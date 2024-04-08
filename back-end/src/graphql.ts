
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

export class ContribucionAccion {
    id: string;
    idUsuario: string;
    idAccion: string;
    nombre: string;
    email: string;
    contribucion: number;
}

export abstract class IQuery {
    abstract allUsers(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract userByUsername(username: string): User | Promise<User>;

    abstract listarContribuciones(): ContribucionAccion[] | Promise<ContribucionAccion[]>;

    abstract getContribucionByID(id: string): ContribucionAccion | Promise<ContribucionAccion>;

    abstract getContribucionByIDAccion(idAccion: string): ContribucionAccion[] | Promise<ContribucionAccion[]>;

    abstract getContribucionByIDUsuario(idUsuario: string): ContribucionAccion[] | Promise<ContribucionAccion[]>;
}

export abstract class IMutation {
    abstract createUser(username: string, password: string, nombre: string, telefono: string, ciudad: string, pais: string): User | Promise<User>;

    abstract createUserDto(createUserDto: CreateUserDto): User | Promise<User>;

    abstract crearContribucionAccion(idUsuario: string, idAccion: string, nombre: string, email: string, contribucion: number): ContribucionAccion | Promise<ContribucionAccion>;
}

type Nullable<T> = T | null;
