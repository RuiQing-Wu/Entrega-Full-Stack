import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSolicitudDto {
  @ApiProperty({
    example:
      'Estoy muy interesado en unirme a su comunidad solidaria. He estado siguiendo sus actividades y me encantaría contribuir y participar activamente.',
    description: 'Descripción de la solicitud',
  })
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({
    example: '2024-02-19T23:00:00.000Z',
    description: 'Fecha de realización de la solicitud',
  })
  @IsNotEmpty()
  readonly fechaSolicitud: Date;

  @ApiProperty({
    example: 'aceptada',
    description: 'Estado de la solicitud',
  })
  @IsNotEmpty()
  readonly estado: string;

  @ApiProperty({
    example: '65a5224d00704a47ca02ace9',
    description: 'ID del usuario que realiza la solicitud',
  })
  @IsNotEmpty()
  readonly idUsuario: string;

  @ApiProperty({
    example: '65a5224e00704a47ca02ad0e',
    description: 'ID de la comunidad a la que se realiza la solicitud',
  })
  @IsNotEmpty()
  readonly idComunidad: string;
}
