
export class UsuarioSeguimiento {
    readonly idUsuario: string;
    readonly username: string;

    constructor({
        idUsuario,
        username,
    }: {
        idUsuario: string,
        username: string,
    }) {
        this.idUsuario = idUsuario;
        this.username = username;
    };
}