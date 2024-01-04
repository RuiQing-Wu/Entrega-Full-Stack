import { AccionSolidaria } from "src/acciones/domain/accion_solidaria.domain";
import { Comunidad } from "src/comunidades/domain/comunidades.domain";

export class CausaSolidaria {
    readonly id?: string;
    readonly titulo: string;
    readonly descripcion: string;
    readonly fechaInicio: Date;
    readonly fechaFin: Date;
    readonly acciones: AccionSolidaria[];
    readonly comunidad: string;
    readonly categorias: string[];
  
    constructor({
      id,
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      accionSolidaria,
      comunidad,
      categorias,
    }) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.acciones = accionSolidaria;
      this.comunidad = comunidad;
      this.categorias = categorias;
    }
  }
  