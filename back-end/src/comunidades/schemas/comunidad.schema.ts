import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CausaMongoModel } from 'src/causas/schemas/causa.schema';

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
