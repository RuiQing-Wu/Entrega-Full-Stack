import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CausasRepository } from './causas.repository';
import { CausaSolidaria } from '../domain/causa_solidaria.domain';
import { AccionSolidaria } from '../../acciones/domain/accion_solidaria.domain';
import { CausaMongoModel } from '../schemas/causa.schema';
import { RepositoryError } from 'src/base/repositoryError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

export class CausasRepositoryMongo implements CausasRepository {
  constructor(
    @InjectModel(CausaSolidaria.name)
    private readonly causaModel: Model<CausaMongoModel>,
  ) {}

  /* private toCausaSolidariaDomain(
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
  } */

  private toCausaSolidariaDomain(
    causaMongoModel: HydratedDocument<CausaMongoModel>,
  ): CausaSolidaria {
    if (causaMongoModel) {
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
  }

  async create(item: CausaSolidaria): Promise<CausaSolidaria> {
    try {
      const causaCreated = await this.causaModel.create(item);
      const causa = new CausaSolidaria({
        ...item,
        id: causaCreated._id.toString(),
      });

      return causa;
    } catch (error) {
      throw new RepositoryError('Error al crear la causa solidaria');
    }
  }

  async get(id: string): Promise<CausaSolidaria> {
    try {
      const causa = await this.causaModel.findById(id).exec();

      if (causa === null) {
        throw new EntityNotFoundError(
          'Causa solidaria no encontrada con id ' + id,
        );
      }

      return this.toCausaSolidariaDomain(causa);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError(
        'Error al obtener la causa solidaria con id ' + id,
      );
    }
  }

  async getByName(titulo: string): Promise<CausaSolidaria> {
    try {
      const causa = await this.causaModel.findOne({ titulo: titulo });
      if (causa === null) {
        throw new EntityNotFoundError(
          'Causa solidaria no encontrada con titulo ' + titulo,
        );
      }

      return this.toCausaSolidariaDomain(causa);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError(
        'Error al obtener las causas solidarias por titulo',
      );
    }
  }

  async getByComunidadId(comunidad: string): Promise<CausaSolidaria[]> {
    try {
      const causasModel = await this.causaModel.find({ comunidad }).exec();

      const causas = causasModel.map((causaModel) => {
        return this.toCausaSolidariaDomain(causaModel);
      });

      return causas;
    } catch (error) {
      throw new RepositoryError(
        'Error al obtener las causas solidarias por id comunidad',
      );
    }
  }

  async getAll(): Promise<CausaSolidaria[]> {
    try {
      const causasModel = await this.causaModel.find().exec();

      const causas = causasModel.map((causaModel) => {
        return this.toCausaSolidariaDomain(causaModel);
      });

      return causas;
    } catch (error) {
      throw new RepositoryError('Error al obtener las causas solidarias');
    }
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idComunidad: string,
  ): Promise<CausaSolidaria[]> {
    try {
      const causas = await this.getByComunidadId(idComunidad);

      const causasFiltradasPorComunidad = await this.causaModel
        .find({
          comunidad: { $in: causas.map((causa) => causa.comunidad) },
          titulo: { $regex: titulo, $options: 'i' },
        })
        .exec();

      return causasFiltradasPorComunidad.map((causa) => {
        return this.toCausaSolidariaDomain(causa);
      });
    } catch (error) {
      throw new RepositoryError(
        'Error al obtener la causa solidaria con titulo ' +
          titulo +
          ' y comunidad ' +
          idComunidad,
      );
    }
  }

  async update(id: string, item: CausaSolidaria): Promise<CausaSolidaria> {
    try {
      const causa = await this.causaModel.findByIdAndUpdate(id, item).exec();
      const causaUpdated = new CausaSolidaria({
        ...item,
        id: causa._id.toString(),
      });

      return causaUpdated;
    } catch (error) {
      throw new RepositoryError(
        'Error al actualizar la causa solidaria con id ' + id,
      );
    }
  }

  async delete(id: string): Promise<CausaSolidaria> {
    const causa = await this.get(id);

    try {
      if (causa) {
        await this.causaModel.findByIdAndDelete(id).exec();
        return causa;
      }
    } catch (error) {
      throw new RepositoryError(
        'Error al eliminar la causa solidaria con id ' + id,
      );
    }
  }
}
