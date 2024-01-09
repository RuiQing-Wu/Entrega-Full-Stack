import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type ApoyoRegistroDocument = HydratedDocument<ApoyoRegistroMongoModel>;

@Schema()
export class ApoyoRegistroMongoModel {

    @Prop({ type: mongoose.Types.ObjectId, ref: 'CausaMongoModel' })
    idCausa: string;
    
    @Prop()
    nombre: string;

    @Prop()
    correo: string;
}

export const ApoyoRegistroSchema = SchemaFactory.createForClass(ApoyoRegistroMongoModel);
