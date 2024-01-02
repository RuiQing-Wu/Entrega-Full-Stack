import { AccionSolidaria } from "src/acciones/domain/accion_solidaria.domain";
import { Comunidad } from "src/comunidades/domain/comunidades.domain";

export class CreateCausaDto {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    acciones: AccionSolidaria[];
    comunidad: Comunidad;
  }