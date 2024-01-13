import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  ciudad: string;

  @IsNotEmpty()
  pais: string;

  @IsOptional()
  role: string;
}