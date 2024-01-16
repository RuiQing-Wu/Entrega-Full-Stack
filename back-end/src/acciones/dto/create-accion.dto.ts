import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccionDto {
  @ApiProperty({
    example: 'Operación Abrigo Caliente',
    description: 'Titulo de la accion',
  })
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example:
      'Distribución de abrigos y prendas de vestir a personas necesitadas durante las estaciones frías.',
    description: 'Descripcion de la accion',
  })
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    example: [
      'Proporcionar abrigos y prendas de vestir a personas sin hogar.',
      'Alcanzar comunidades marginadas que enfrentan dificultades durante el invierno.',
      'Promover la conciencia sobre la importancia de la ayuda en las estaciones frías.',
      '',
    ],
    description: 'Lista de objetivos de la accion',
  })
  listaObjetivos: string[];

  @ApiProperty({
    example: 22,
    description: 'Progreso de la accion',
  })
  @IsNotEmpty()
  progreso: number;

  @ApiProperty({
    example: '65a5224e00704a47ca02ad38',
    description: 'Causa a la que pertenece la accion',
  })
  @IsNotEmpty()
  causa: string;
}
