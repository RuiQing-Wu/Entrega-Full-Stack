import { CausaSolidaria } from "src/causas/domain/causa_solidaria.domain";

export class Comunidad {
  readonly id?: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly fechaInicio: Date;
  readonly causas: CausaSolidaria[];

  constructor(data: {
    id?: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    causas: CausaSolidaria[];
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.fechaInicio = data.fechaInicio;
    this.causas = data.causas;
  }
}

