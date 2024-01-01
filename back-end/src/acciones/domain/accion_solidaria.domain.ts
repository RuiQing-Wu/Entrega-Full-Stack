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