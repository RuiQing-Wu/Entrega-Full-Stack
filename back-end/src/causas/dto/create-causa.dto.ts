import { AccionSolidaria } from 'src/acciones/domain/accion_solidaria.domain';

export class CreateCausaDto {
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  comunidad: string;
  objetivos: string[];
}
