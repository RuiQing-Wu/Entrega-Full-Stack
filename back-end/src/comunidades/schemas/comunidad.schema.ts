import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<ComunidadMongoModel>;

@Schema()
export class ComunidadMongoModel {
  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  idAdministrador: string;

  @Prop()
  usuarios: string[];
}

export const ComunidadSchema =
  SchemaFactory.createForClass(ComunidadMongoModel);
