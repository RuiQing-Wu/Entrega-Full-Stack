import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PrimaryColumn } from 'typeorm';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ComunidadModel {
  @Prop()
  id: string;

  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaInicio: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CausaModel' }] })
  causas: CausaModel[];
}

@Schema()
export class CausaModel {
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

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'AccionModel' }] })
  acciones: AccionModel[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ComunidadModel' })
  comunidad: ComunidadModel;
}

@Schema()
export class AccionModel {
  @Prop()
  id: string;

  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  listaObjetivos: [];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CausaModel' })
  causa: CausaModel;
}

export const ComunidadSchema = SchemaFactory.createForClass(ComunidadModel);
export const CausaSchema = SchemaFactory.createForClass(CausaModel);
export const AccionSchema = SchemaFactory.createForClass(AccionModel);
