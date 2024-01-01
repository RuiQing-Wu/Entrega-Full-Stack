import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { CausaMongoModel } from "src/causas/schemas/causa.schema";

export type UserDocument = HydratedDocument<ComunidadMongoModel>;

@Schema()
export class ComunidadMongoModel {
  @Prop()
  id: string;

  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'CausaMongoModel' }] })
  causas: CausaMongoModel[];
}

export const ComunidadSchema = SchemaFactory.createForClass(ComunidadMongoModel);