import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AccionesRepository } from './acciones.repository';
import { AccionSolidaria } from '../domain/accion_solidaria.domain';
import { AccionMongoModel } from '../schemas/accion.schema';

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
      console.log(error);
      throw new Error('Error al crear la accion solidaria');
      // throw new RepositoryError('Error al crear la accion solidaria');
    }
  }

  async get(id: string): Promise<AccionSolidaria> {
    try {
      const accion = await this.accionModel.findById(id).exec();
      return this.toAccionSolidariaDomain(accion);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener la accion solidaria con id ' + id);
    }
  }

  async getByName(titulo: string): Promise<AccionSolidaria> {
    try {
      const accion = await this.accionModel.findOne({ titulo }).exec();
      return this.toAccionSolidariaDomain(accion);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error al obtener la accion solidaria con titulo' + titulo);
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
      console.log(error);
      throw new Error('Error al obtener la accion solidaria con causa' + causa);
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
      console.log(error);
      throw new Error('Error al obtener la accion solidaria con titulo' + titulo);
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
      console.log(error);
      throw new Error('Error al obtener las acciones solidarias');
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
      console.log(error);
      throw new Error('Error al actualizar la accion solidaria');
    }
  }

  async delete(id: string): Promise<AccionSolidaria> {
    try {
      const accion = await this.get(id);
      if (accion) {
        await this.accionModel.findByIdAndDelete(id).exec();
        return accion;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error('Error al eliminar la accion solidaria');
    }
  }
}
