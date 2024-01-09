import { Exclude } from "class-transformer";

export class User {
    readonly id?: string;
    readonly username: string;

    @Exclude()
    password: string;
    readonly nombre: string;
    readonly telefono: string;
    readonly ciudad: string;
    readonly pais: string;
    readonly role: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}