import { CausaSolidaria } from 'src/causas/domain/causa_solidaria.domain';

export class AccionSolidaria {
  readonly id?: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly listaObjetivos: string[];
  readonly progreso: number;
  readonly causa: CausaSolidaria;

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
    causa: CausaSolidaria;
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.listaObjetivos = listaObjetivos;
    this.progreso = progreso;
    this.causa = causa;
  }
}
