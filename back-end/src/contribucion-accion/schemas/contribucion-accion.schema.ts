import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<ContribucionMongoModel>;

@Schema()
export class ContribucionMongoModel {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'UserMongoModel' })
  idUsuario: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'AccionMongoModel' })
  idAccion: string;

  @Prop()
  nombre: string;

  @Prop()
  email: string;

  @Prop()
  contribucion: number;
}

export const ContribucionSchema = SchemaFactory.createForClass(ContribucionMongoModel);
