import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateComunidadDto {
  @ApiProperty({
    example: 'Unidos por el Bien',
    description: 'Nombre de la comunidad',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example:
      'Comunidad comprometida con la ayuda mutua y el apoyo emocional. Juntos, creamos un entorno donde cada miembro se siente valorado y respaldado.',
    description: 'Descripción de la comunidad',
  })
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    example: '2023-12-31T23:00:00.000Z',
    description: 'Fecha de inicio de la comunidad',
  })
  @IsNotEmpty()
  fechaInicio: Date;

  @ApiProperty({
    example: '65a5224d00704a47ca02ace9',
    description: 'id del administrador de la comunidad',
  })
  @IsNotEmpty()
  idAdministrador: string;

  @ApiProperty({
    example: [
      '65a5224d00704a47ca02ace9',
      '65a5224d00704a47ca02aceb',
      '65a5224d00704a47ca02aced',
    ],
    description: 'Lista de usuarios de la comunidad',
  })
  @IsNotEmpty()
  usuarios: string[];

  @ApiProperty({
    example: 'Salud',
    description: 'Categoría de la comunidad',
  })
  @IsNotEmpty()
  categorias: string[];
}
