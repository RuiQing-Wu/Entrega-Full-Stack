import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCausaDto {
  @ApiProperty({
    example: 'Proyecto Sonrisas para Todos',
    description: 'Titulo de la causa',
  })
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example:
      'Inspirando felicidad y esperanza al proporcionar apoyo a comunidades necesitadas a través de acciones solidarias.',
    description: 'Descripcion de la causa',
  })
  descripcion: string;

  @ApiProperty({
    example: '2021-04-20T00:00:00.000Z',
    description: 'Fecha de inicio de la causa',
  })
  fechaInicio: Date;

  @ApiProperty({
    example: '2021-04-20T00:00:00.000Z',
    description: 'Fecha de fin de la causa',
  })
  fechaFin: Date;

  @ApiProperty({
    example: '65a5224e00704a47ca02ad0b',
    description: 'Comunidad a la que pertenece la causa',
  })
  comunidad: string;

  @ApiProperty({
    example: [
      'Fin de la Pobreza',
      'Trabajo Decente y Crecimiento Económico',
      'Alianzas para Lograr Objetivos',
      '',
    ],
    description: 'Objetivos de la causa',
  })
  objetivos: string[];
}
