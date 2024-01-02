import { CausaSolidaria } from "src/causas/domain/causa_solidaria.domain";

export class Comunidad {
  readonly id?: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly fechaInicio: Date;
  readonly causas: CausaSolidaria[];

  constructor({
    id,
    nombre,
    descripcion,
    fechaInicio,
    causas
  }: {
    id?: string,
    nombre: string,
    descripcion: string,
    fechaInicio: Date,
    causas: CausaSolidaria[],
  }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaInicio = fechaInicio;
    this.causas = causas;
  }
}

