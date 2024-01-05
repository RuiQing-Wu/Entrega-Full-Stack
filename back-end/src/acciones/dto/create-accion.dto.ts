import { CausaSolidaria } from 'src/causas/domain/causa_solidaria.domain';

export class CreateAccionDto {
  titulo: string;
  descripcion: string;
  listaObjetivos: string[];
  progreso: number;
  causa: CausaSolidaria;
}
