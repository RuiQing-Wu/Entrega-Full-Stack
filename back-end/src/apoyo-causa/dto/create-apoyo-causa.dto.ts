import { IsNotEmpty } from "class-validator";

export class CreateApoyoCausaDto {

    @IsNotEmpty()
    idCausa: string;

    @IsNotEmpty()
    numApoyo: number;
}
