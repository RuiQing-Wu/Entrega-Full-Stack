import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {

  @ApiProperty({
    example: 'juan',
    description: 'Nombre de usuario particular',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1234',
    description: 'Cotraseña de usuario',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: '658925123',
    description: 'Teléfono del usuario',
  })
  @IsNotEmpty()
  telefono: string;

  @ApiProperty({
    example: 'Madrid',
    description: 'Ciduad del usuario',
  })
  @IsNotEmpty()
  ciudad: string;

  @ApiProperty({
    example: 'España',
    description: 'Pais del usuario',
  })
  @IsNotEmpty()
  pais: string;

  @ApiProperty({
    example: 'user',
    description: 'Rol del usuario',
  })
  @IsOptional()
  role: string;
}