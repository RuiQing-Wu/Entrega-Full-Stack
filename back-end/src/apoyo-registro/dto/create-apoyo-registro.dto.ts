import { IsNotEmpty } from "class-validator";

export class CreateApoyoRegistroDto {
    @IsNotEmpty()
    idCausa: string;

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    correo: string;
}
