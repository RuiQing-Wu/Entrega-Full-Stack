export class ApoyoCausa {
  readonly idComunidad: string;
  readonly idCausa: string[];
  readonly apoyo: number[];

  constructor({
    idComunidad,
    idCausa,
    apoyo
  }: {
    idComunidad: string,
    idCausa: string[],
    apoyo: number[],
  }) {
    this.idComunidad = idComunidad;
    this.idCausa = idCausa;
    this.apoyo = apoyo;
  }
}