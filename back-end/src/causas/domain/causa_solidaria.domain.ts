import { AccionSolidaria } from "src/acciones/domain/accion_solidaria.domain";
import { Comunidad } from "src/comunidades/domain/comunidades.domain";

export class CausaSolidaria {
    readonly id?: string;
    readonly titulo: string;
    readonly descripcion: string;
    readonly fechaInicio: Date;
    readonly fechaFin: Date;
    readonly comunidad: string;
    readonly objetivos: string[];
  
    constructor({
      id,
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      comunidad,
      objetivos,
    }: {
      id?: string,
      titulo: string,
      descripcion: string,
      fechaInicio: Date,
      fechaFin: Date,
      comunidad: string,
      objetivos: string[],
    }) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.comunidad = comunidad;
      this.objetivos = objetivos;
    }
  }
  