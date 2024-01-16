import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApoyoRegistroDto {
  @ApiProperty({
    example: '65a5224e00704a47ca02ad38',
    description: 'Id de la causa a la que se le da apoyo',
  })
  @IsNotEmpty()
  idCausa: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario que apoya',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: 'juan@um.es',
    description: 'Correo del usuario que apoya',
  })
  @IsNotEmpty()
  correo: string;
}
