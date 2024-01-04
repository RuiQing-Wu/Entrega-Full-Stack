import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CausaMongoModel } from 'src/causas/schemas/causa.schema';

export type UserDocument = HydratedDocument<AccionMongoModel>;

@Schema()
export class AccionMongoModel {
  @Prop()
  id: string;

  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  listaObjetivos: [];

  @Prop()
  progreso: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'CausaMongoModel' })
  causa: CausaMongoModel;
}

export const AccionSchema = SchemaFactory.createForClass(AccionMongoModel);
