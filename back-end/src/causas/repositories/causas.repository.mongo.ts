import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CausasRepository } from './causas.repository';
import { CausaSolidaria } from '../domain/causa_solidaria.domain';
import { AccionSolidaria } from '../../acciones/domain/accion_solidaria.domain';
import { CausaMongoModel } from '../schemas/causa.schema';

export class CausasRepositoryMongo implements CausasRepository {
  constructor(
    @InjectModel(CausaSolidaria.name)
    private readonly causaModel: Model<CausaMongoModel>,
  ) {

  }

  private transform(
    causaMongoModel: HydratedDocument<CausaMongoModel>,
  ): CausaSolidaria {
    const causa = new CausaSolidaria({
      id: causaMongoModel._id.toString(),
      titulo: causaMongoModel.titulo,
      descripcion: causaMongoModel.descripcion,
      fechaInicio: causaMongoModel.fechaInicio,
      fechaFin: causaMongoModel.fechaFin,
      comunidad: causaMongoModel.comunidad,
      objetivos: causaMongoModel.objetivos,
    });

    return causa;
  }

  async create(item: CausaSolidaria): Promise<CausaSolidaria> {
    const causaModel: CausaMongoModel = await this.causaModel.create(item);

    const causaCreated = await this.causaModel.create(causaModel);

    const causa = new CausaSolidaria({
      id: causaCreated._id.toString(),
      titulo: causaCreated.titulo,
      descripcion: causaCreated.descripcion,
      fechaInicio: causaCreated.fechaInicio,
      fechaFin: causaCreated.fechaFin,
      comunidad: causaCreated.comunidad,
      objetivos: causaCreated.objetivos,
    });

    return causa;
  }

  async get(id: string): Promise<CausaSolidaria> {
    const causa = await this.causaModel.findById(id).exec();

    return this.transform(causa);
  }

  async getByName(titulo: string): Promise<CausaSolidaria[]> {
    const causasModel = await this.causaModel.find({ titulo }).exec();

    const causas = causasModel.map((causaModel) => {
      return this.transform(causaModel);
    });

    return causas;
  }

  async getByComunidadId(comunidad: string): Promise<CausaSolidaria[]> {
    const causasModel = await this.causaModel.find({ comunidad }).exec();

    const causas = causasModel.map((causaModel) => {
      return this.transform(causaModel);
    });

    return causas;
  }

  async getAll(): Promise<CausaSolidaria[]> {
    const causasModel = await this.causaModel.find().exec();

    const causas = causasModel.map((causaModel) => {
      return this.transform(causaModel);
    });

    return causas;
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idComunidad: string,
  ): Promise<CausaSolidaria[]> {
    const causas = await this.getByComunidadId(idComunidad);

    const causasFiltradasPorComunidad = await this.causaModel
      .find({
        comunidad: { $in: causas.map((causa) => causa.comunidad) },
        titulo: { $regex: titulo, $options: 'i' },
      })
      .exec();

    return causasFiltradasPorComunidad.map((causa) => {
      return this.transform(causa);
    });
  }

  async update(id: string, item: CausaSolidaria): Promise<CausaSolidaria> {
    const causa = await this.causaModel.findByIdAndUpdate(id, item).exec();
    const causaUpdated = new CausaSolidaria({
      ...item,
      id: causa._id.toString(),
    });

    return causaUpdated;
  }

  async delete(id: string): Promise<CausaSolidaria> {
    const causa = await this.get(id);

    if (causa) {
      await this.causaModel.findByIdAndDelete(id).exec();
      return causa;
    }
  }
}
