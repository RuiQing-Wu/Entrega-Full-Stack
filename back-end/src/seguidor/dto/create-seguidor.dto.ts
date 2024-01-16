import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSeguidorDto {

    @ApiProperty({
        example: '65a5224d00704a47ca02acef',
        description: 'id del usuario',
    })
    @IsNotEmpty()
    idUsuario: string;

    @ApiProperty({
        example: 'ana',
        description: 'nombre del usuario',
    })
    @IsNotEmpty()
    username: string;
}
