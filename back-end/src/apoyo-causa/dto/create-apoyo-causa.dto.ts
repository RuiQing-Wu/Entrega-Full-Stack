import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApoyoCausaDto {
  @ApiProperty({
    example: '65a5224e00704a47ca02ad44',
    description: 'Id de la causa a la que se le da apoyo',
  })
  @IsNotEmpty()
  idCausa: string;

  @ApiProperty({
    example: 0,
    description: 'Total de apoyos a la causa',
  })
  @IsNotEmpty()
  numApoyo: number;
}
