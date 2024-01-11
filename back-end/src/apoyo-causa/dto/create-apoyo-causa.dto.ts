import { IsNotEmpty } from "class-validator";

export class CreateApoyoCausaDto {
   /*  @IsNotEmpty()
    idComunidad: string; */

    @IsNotEmpty()
    idCausa: string;

    @IsNotEmpty()
    numApoyo: number;
}
