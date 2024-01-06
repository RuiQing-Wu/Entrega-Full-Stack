export class CreateSolicitudDto {
    // readonly nombre: string;
    readonly descripcion: string;
    readonly fechaSolicitud: Date;
    readonly estado: boolean;
    readonly idUsuario: string;
    readonly idComunidad: string;
}
