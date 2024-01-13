export class Solicitud {
    readonly id?: string;
    readonly descripcion: string;
    readonly fechaSolicitud: Date;
    readonly estado: boolean;
    readonly idUsuario: string;
    readonly idComunidad: string;

    constructor({
        id,
        descripcion,
        fechaSolicitud,
        estado,
        idUsuario,
        idComunidad
    }: {
        id?: string,
        descripcion: string,
        fechaSolicitud: Date,
        estado: boolean,
        idUsuario: string,
        idComunidad: string
    }) {
        this.id = id;
        this.descripcion = descripcion;
        this.fechaSolicitud = fechaSolicitud;
        this.estado = estado;
        this.idUsuario = idUsuario;
        this.idComunidad = idComunidad;
    }
}