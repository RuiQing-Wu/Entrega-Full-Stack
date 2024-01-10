import { CausaSolidaria } from 'src/causas/domain/causa_solidaria.domain';
import { UserMongoModel } from 'src/users/schemas/user.schema';

export class Comunidad {
  readonly id?: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly fechaInicio: Date;
  readonly idAdministrador: string;
  readonly usuarios: string[];

  constructor({
    id,
    nombre,
    descripcion,
    fechaInicio,
    idAdministrador,
    usuarios,
  }: {
    id?: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    idAdministrador: string;
    usuarios: string[];
  }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaInicio = fechaInicio;
    this.idAdministrador = idAdministrador;
    this.usuarios = usuarios;
  }
}
