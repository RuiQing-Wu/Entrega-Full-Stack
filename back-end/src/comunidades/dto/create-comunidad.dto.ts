import { CausaSolidaria } from "src/causas/domain/causa_solidaria.domain";

export class CreateComunidadDto {
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  causas: CausaSolidaria[];
}
