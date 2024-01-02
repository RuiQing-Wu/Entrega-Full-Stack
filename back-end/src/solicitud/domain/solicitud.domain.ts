export class Solicitud {
    readonly id?: string;
    readonly nombre: string;
    readonly descripcion: string;
    readonly fecha_solicitud: Date;
    readonly estado: boolean;
    readonly id_usuario: string;
    readonly id_comunidad: string;

    constructor({
        id,
        nombre,
        descripcion,
        fecha_solicitud,
        estado,
        id_usuario,
        id_comunidad
    }: {
        id?: string,
        nombre: string,
        descripcion?: string,
        fecha_solicitud: Date,
        estado: boolean,
        id_usuario: string,
        id_comunidad: string
    }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_solicitud = fecha_solicitud;
        this.estado = estado;
        this.id_usuario = id_usuario;
        this.id_comunidad = id_comunidad;
    }
}