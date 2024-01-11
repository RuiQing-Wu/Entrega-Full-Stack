import { Exclude } from "class-transformer";

/* export class ApoyoCausaIndividuo {
  readonly idCausa: string;
  readonly apoyo: number;

  constructor({
    idCausa,
    apoyo
  }: {
    idCausa: string,
    apoyo: number,
  }) {
    this.idCausa = idCausa;
    this.apoyo = apoyo;
  }
} */

export class ApoyoCausa {
  // readonly idComunidad: string;

  readonly idCausa: string;

  readonly numApoyo: number;
  
  // readonly listaApoyo: ApoyoCausaIndividuo[];

  constructor({
    // idComunidad,
    idCausa,
    numApoyo,
    // listaApoyo
  }: {
    // idComunidad: string,
    idCausa: string,
    numApoyo: number,
    // listaApoyo?: ApoyoCausaIndividuo[]
  }) {
    // this.idComunidad = idComunidad;
    this.idCausa = idCausa;
    this.numApoyo = numApoyo;
    // this.listaApoyo = listaApoyo || [];
  }
}