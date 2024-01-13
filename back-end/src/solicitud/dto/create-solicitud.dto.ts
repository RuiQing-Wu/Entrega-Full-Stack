import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateSolicitudDto {
    @IsOptional()
    readonly descripcion: string;

    @IsNotEmpty()
    readonly fechaSolicitud: Date;
    
    @IsNotEmpty()
    readonly estado: boolean;
    
    @IsNotEmpty()
    readonly idUsuario: string;
    
    @IsNotEmpty()
    readonly idComunidad: string;
}
