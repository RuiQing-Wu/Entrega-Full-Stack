// Modelo de dominio

/*
Para facilitar las transformaciones entre el dominio, 
persistencia y DTO, los atributos se declaran públicos.
*/
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

export class CausaSolidaria {
  readonly id?: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly fechaInicio: Date;
  readonly fechaFin: Date;
  readonly acciones: AccionSolidaria[];

  constructor(data: {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    accionSolidaria: AccionSolidaria[];
  }) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.fechaInicio = data.fechaInicio;
    this.fechaFin = data.fechaFin;
    this.acciones = data.accionSolidaria;
  }
}

export class AccionSolidaria {
  readonly id?: string; // inicialmente no tiene ID
  readonly titulo: string;
  readonly descripcion: string;
  readonly listaObjetivos: [];

  constructor(data: {
    id?: string;
    titulo: string;
    descripcion: string;
    listaObjetivos: [];
  }) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.listaObjetivos = data.listaObjetivos;
  }
}
