import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AccionMongoModel } from 'src/acciones/schemas/accion.schema';

export type UserDocument = HydratedDocument<CausaMongoModel>;

@Schema()
export class CausaMongoModel {
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'ComunidadMongoModel' })
  comunidad: string;

  @Prop()
  objetivos: string[];
}

export const CausaSchema = SchemaFactory.createForClass(CausaMongoModel);
