export class AccionSolidaria {
  readonly id?: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly listaObjetivos: string[];
  readonly tipo: string;
  readonly totalObjetivo: number;
  readonly progreso: number;
  readonly causa: string;

  constructor({
    id,
    titulo,
    descripcion,
    listaObjetivos,
    tipo,
    totalObjetivo,
    progreso,
    causa,
  }: {
    id?: string;
    titulo: string;
    descripcion: string;
    listaObjetivos: string[];
    tipo: string;
    totalObjetivo: number;
    progreso: number;
    causa: string;
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.listaObjetivos = listaObjetivos;
    this.tipo = tipo;
    this.totalObjetivo = totalObjetivo;
    this.progreso = progreso;
    this.causa = causa;
  }
}
