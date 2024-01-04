import { CausaSolidaria } from 'src/causas/domain/causa_solidaria.domain';

export class AccionSolidaria {
  readonly id?: string;
  readonly titulo: string;
  readonly descripcion: string;
  readonly listaObjetivos: string[];
  readonly progreso: number;
  readonly causa: CausaSolidaria;

  constructor(data: {
    id;
    titulo;
    descripcion;
    listaObjetivos;
    progreso;
    causa;
  }) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.listaObjetivos = data.listaObjetivos;
    this.progreso = data.progreso;
    this.causa = data.causa;
  }
}
