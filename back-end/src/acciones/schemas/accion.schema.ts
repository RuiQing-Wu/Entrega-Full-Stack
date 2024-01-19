import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AccionMongoModel>;

@Schema()
export class AccionMongoModel {
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  listaObjetivos: [];

  @Prop()
  progreso: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'CausaMongoModel' })
  causa: string;
}

export const AccionSchema = SchemaFactory.createForClass(AccionMongoModel);
