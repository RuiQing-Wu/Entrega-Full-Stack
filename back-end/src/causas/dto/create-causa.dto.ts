import { AccionSolidaria } from 'src/acciones/domain/accion_solidaria.domain';

export class CreateCausaDto {
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  acciones: AccionSolidaria[];
  comunidad: string;
  objetivos: string[];
}
