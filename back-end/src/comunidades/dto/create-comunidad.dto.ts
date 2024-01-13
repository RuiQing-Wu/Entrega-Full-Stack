import { IsNotEmpty } from 'class-validator';

export class CreateComunidadDto {

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  fechaInicio: Date;

  @IsNotEmpty()
  idAdministrador: string;

  @IsNotEmpty()
  usuarios: string[];
}
