export class User {
    readonly id?: string;
    readonly username: string;
    readonly password: string;
    readonly role: string;

    constructor({
        id,
        username,
        password,
        role
    } :{
        id?: string,
        username: string,
        password: string,
        role: string
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}