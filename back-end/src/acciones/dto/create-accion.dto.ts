import { IsNotEmpty } from 'class-validator';

export class CreateAccionDto {

  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  descripcion: string;

  listaObjetivos: string[];
  
  @IsNotEmpty()
  progreso: number;
  
  @IsNotEmpty()
  causa: string;
}
