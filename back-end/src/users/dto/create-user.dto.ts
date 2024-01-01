import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

  id: string;

  @IsNotEmpty()
  username: string;

  @Exclude()
  password: string;

  @IsNotEmpty()
  role: string;
}