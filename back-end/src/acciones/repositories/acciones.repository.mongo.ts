import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AccionesRepository } from './acciones.repository';
import { AccionSolidaria } from '../domain/accion_solidaria.domain';
import { AccionMongoModel } from '../schemas/accion.schema';
import { RepositoryError } from '../../base/repositoryError';
import { EntityNotFoundError } from '../../base/entityNotFounError';

export class AccionesRepositoryMongo implements AccionesRepository {
  constructor(
    @InjectModel(AccionSolidaria.name)
    private readonly accionModel: Model<AccionMongoModel>,
  ) {

  }

  private toAccionSolidariaDomain(accionModel: HydratedDocument<AccionSolidaria>): AccionSolidaria {
    const accion = new AccionSolidaria({
      id: accionModel._id.toString(),
      titulo: accionModel.titulo,
      descripcion: accionModel.descripcion,
      listaObjetivos: accionModel.listaObjetivos,
      tipo: accionModel.tipo,
      totalObjetivo: accionModel.totalObjetivo,
      progreso: accionModel.progreso,
      causa: accionModel.causa,
    });

    return accion;
  }

  async create(item: AccionSolidaria): Promise<AccionSolidaria> {
    try {
      const accionCreated = await this.accionModel.create(item);
      const accion = new AccionSolidaria({
        ...item,
        id: accionCreated._id.toString(),
      });

      return accion;
    }
    catch (error) {
      throw new RepositoryError('Error al crear la accion solidaria');
    }
  }

  async get(id: string): Promise<AccionSolidaria> {
    try {
      const accion = await this.accionModel.findById(id).exec();

      if (accion === null) {
        throw new EntityNotFoundError('Accion solidaria no encontrada con id ' + id);
      }

      return this.toAccionSolidariaDomain(accion);
    } catch (error) {

      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener la accion solidaria con id ' + id);
    }
  }

  async getByName(titulo: string): Promise<AccionSolidaria> {
    try {
      const accion = await this.accionModel.findOne({ titulo }).exec();

      if (accion === null) {
        throw new EntityNotFoundError('Accion solidaria no encontrada con titulo ' + titulo);
      }

      return this.toAccionSolidariaDomain(accion);
    }
    catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener la accion solidaria con titulo ' + titulo);
    }
  }

  async getByCausaId(causa: string): Promise<AccionSolidaria[]> {
    try {
      const accionesModel = await this.accionModel.find({ causa }).exec();

      const acciones = accionesModel.map((accionModel) => {
        return this.toAccionSolidariaDomain(accionModel);
      });

      return acciones;
    } catch (error) {
      throw new RepositoryError('Error al obtener la accion solidaria con id causa ' + causa);
    }
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idCausa: string,
  ): Promise<AccionSolidaria[]> {
    try {
      const acciones = await this.getByCausaId(idCausa);

      const accionesFiltradasPorComunidad = await this.accionModel
        .find({
          causa: { $in: acciones.map((accion) => accion.causa) },
          titulo: { $regex: titulo, $options: 'i' },
        })
        .exec();

      return accionesFiltradasPorComunidad.map((accion) => {
        return this.toAccionSolidariaDomain(accion);
      });
    } catch (error) {
      throw new RepositoryError('Error al obtener la accion solidaria con titulo ' + titulo + ' y causa ' + idCausa);
    }
  }

  async getAll(): Promise<AccionSolidaria[]> {
    try {
      const accionesModel = await this.accionModel.find().exec();

      const acciones = accionesModel.map((accionModel) => {
        return this.toAccionSolidariaDomain(accionModel);
      });

      return acciones;
    } catch (error) {
      throw new RepositoryError('Error al obtener las acciones solidarias');
    }
  }

  async update(id: string, item: AccionSolidaria): Promise<AccionSolidaria> {
    try {
      const accion = await this.accionModel.findByIdAndUpdate(id, item).exec();
      const accionUpdated = new AccionSolidaria({
        ...item,
        id: accion._id.toString(),
      });

      return accionUpdated;
    }
    catch (error) {
      throw new RepositoryError('Error al actualizar la accion solidaria con id ' + id);
    }
  }

  async delete(id: string): Promise<AccionSolidaria> {
    
    const accion = await this.get(id);

    try {
      if (accion) {
        await this.accionModel.findByIdAndDelete(id).exec();
        return accion;
      }
    }
    catch (error) {
      throw new RepositoryError('Error al eliminar la accion solidaria con id ' + id);
    }
  }
}
