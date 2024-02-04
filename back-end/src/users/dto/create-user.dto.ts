import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
@InputType()
export class CreateUserDto {

  @Field()
  @ApiProperty({
    example: 'juan',
    description: 'Nombre de usuario particular',
  })
  @IsNotEmpty()
  username: string;

  @Field()
  @ApiProperty({
    example: '1234',
    description: 'Cotraseña de usuario',
  })
  @IsNotEmpty()
  password: string;

  @Field()
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsNotEmpty()
  nombre: string;

  @Field()
  @ApiProperty({
    example: '658925123',
    description: 'Teléfono del usuario',
  })
  @IsNotEmpty()
  telefono: string;

  @Field()
  @ApiProperty({
    example: 'Madrid',
    description: 'Ciduad del usuario',
  })
  @IsNotEmpty()
  ciudad: string;

  @Field()
  @ApiProperty({
    example: 'España',
    description: 'Pais del usuario',
  })
  @IsNotEmpty()
  pais: string;

  @Field()
  @ApiProperty({
    example: 'user',
    description: 'Rol del usuario',
  })
  @IsOptional()
  role: string;
}