import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContribucionDto {
  @ApiProperty({
    example: '123456',
    description: 'Id del contribuyente',
  })
  @IsNotEmpty()
  idUsuario: string;

  @ApiProperty({
    example:
      '654321',
    description: 'Id de la accion',
  })
  @IsNotEmpty()
  idAccion: string;

  @ApiProperty({
    example: 'Pepe',
    description: 'Lista de objetivos de la accion',
  })
  nombre: string;

  @ApiProperty({
    example: 'pepe@gmail.com',
    description: 'Correo del contribuyente',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 1,
    description: 'Contribucion realizada a la accion',
  })
  @IsNotEmpty()
  contribucion: number;
}
