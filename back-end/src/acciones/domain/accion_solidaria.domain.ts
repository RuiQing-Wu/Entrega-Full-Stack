export class AccionSolidaria {
  readonly id?: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly listaObjetivos: string[];
  readonly progreso: number;
  readonly causa: string;

  constructor({
    id,
    titulo,
    descripcion,
    listaObjetivos,
    progreso,
    causa,
  }: {
    id?: string;
    titulo: string;
    descripcion: string;
    listaObjetivos: string[];
    progreso: number;
    causa: string;
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.listaObjetivos = listaObjetivos;
    this.progreso = progreso;
    this.causa = causa;
  }
}
