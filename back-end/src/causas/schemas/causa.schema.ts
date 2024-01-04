import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AccionMongoModel } from "src/acciones/schemas/accion.schema";

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
  comunidad: string;

  @Prop()
  categorias: string[];
}

export const CausaSchema = SchemaFactory.createForClass(CausaMongoModel);