
export class UsuarioSeguimiento{
    idUserOrigen: string;
    idUserDestino: string;
    nombreUserOrigen: string;
    nombreUserDestino: string;
    fechaSeguimiento: Date;

    constructor({
        idUserOrigen,
        idUserDestino,
        nombreUserOrigen,
        nombreUserDestino,
        fechaSeguimiento,
    }: {
        idUserOrigen: string,
        idUserDestino: string,
        nombreUserOrigen: string,
        nombreUserDestino: string,
        fechaSeguimiento: Date,
    }) {
        this.idUserOrigen = idUserOrigen;
        this.idUserDestino = idUserDestino;
        this.nombreUserOrigen = nombreUserOrigen;
        this.nombreUserDestino = nombreUserDestino;
        this.fechaSeguimiento = fechaSeguimiento;
    }
}