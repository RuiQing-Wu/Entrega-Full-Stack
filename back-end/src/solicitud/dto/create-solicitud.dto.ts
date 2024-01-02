export class CreateSolicitudDto {
    readonly nombre: string;
    readonly descripcion: string;
    readonly fecha_solicitud: Date;
    readonly estado: boolean;
    readonly id_usuario: string;
    readonly id_comunidad: string;
}
