import { Exclude } from "class-transformer";

export class ApoyoCausa {
  readonly idCausa: string;
  readonly numApoyo: number;
  
  constructor({
    idCausa,
    numApoyo,
  }: {
    idCausa: string,
    numApoyo: number,
  }) {
    this.idCausa = idCausa;
    this.numApoyo = numApoyo;
  }
}