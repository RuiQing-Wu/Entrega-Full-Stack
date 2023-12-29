import { CausaSolidaria } from '../domain/comunidades.domain';

export class CreateComunidadDto {
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  causas: CausaSolidaria[];
}
