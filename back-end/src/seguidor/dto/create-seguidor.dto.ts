import { IsNotEmpty } from "class-validator";

export class CreateSeguidorDto {
    @IsNotEmpty()
    idUsuario: string;

    @IsNotEmpty()
    username: string;
}
