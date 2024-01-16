import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<SolicitudMongoModel>;

@Schema()
export class SolicitudMongoModel {

    @Prop()
    descripcion: string;

    @Prop()
    fechaSolicitud: Date;

    @Prop()
    estado: boolean;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'UserMongoModel' })
    idUsuario: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'ComunidadMongoModel' })
    idComunidad: string;
}

export const SolicitudSchema = SchemaFactory.createForClass(SolicitudMongoModel);