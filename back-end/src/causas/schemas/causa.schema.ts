import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AccionMongoModel } from "src/acciones/schemas/accion.schema";
import { ComunidadMongoModel } from "src/comunidades/schemas/comunidad.schema";

export type UserDocument = HydratedDocument<CausaMongoModel>;

@Schema()
export class CausaMongoModel {
  @Prop()
  id: string;

  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin: Date;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'AccionMongoModel' }] })
  acciones: AccionMongoModel[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'ComunidadMongoModel' })
  comunidad: ComunidadMongoModel;
}

export const CausaSchema = SchemaFactory.createForClass(CausaMongoModel);