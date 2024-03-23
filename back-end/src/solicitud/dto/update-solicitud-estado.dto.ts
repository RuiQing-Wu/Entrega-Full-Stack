import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSolicitudDto {
  @ApiProperty({
    example: 'rechazada',
    description: 'Nuevo estado de la solicitud',
  })
  @IsNotEmpty()
  readonly estado: string;

  constructor(estado: string) {
    this.estado = estado;
  }
}
