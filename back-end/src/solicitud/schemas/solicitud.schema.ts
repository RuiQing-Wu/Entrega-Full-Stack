import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<SolicitudMongoModel>;

@Schema()
export class SolicitudMongoModel {

    @Prop()
    nombre: string;

    @Prop()
    descripcion: string;

    @Prop()
    fecha_solicitud: Date;

    @Prop()
    estado: boolean;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'UserMongoModel' })
    id_usuario: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'ComunidadMongoModel' })
    id_comunidad: string;
}

export const SolicitudSchema = SchemaFactory.createForClass(SolicitudMongoModel);