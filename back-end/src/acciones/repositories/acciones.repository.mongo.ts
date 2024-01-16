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
    const accionCreated = await this.accionModel.create(item);

    // TODO: asignar con el objeto
    const accion = new AccionSolidaria({
      ...item,
      id: accionCreated._id.toString(),
    });

    return accion;
  }

  async get(id: string): Promise<AccionSolidaria> {
    const accion = await this.accionModel.findById(id).exec();

    return this.toAccionSolidariaDomain(accion);
  }

  async getByName(titulo: string): Promise<AccionSolidaria> {
    const accion = await this.accionModel.findOne({ titulo }).exec();

    return this.toAccionSolidariaDomain(accion);
  }

  async getByCausaId(causa: string): Promise<AccionSolidaria[]> {
    const accionesModel = await this.accionModel.find({ causa }).exec();

    const acciones = accionesModel.map((accionModel) => {
      return this.toAccionSolidariaDomain(accionModel);
    });

    return acciones;
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idCausa: string,
  ): Promise<AccionSolidaria[]> {
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
  }

  async getAll(): Promise<AccionSolidaria[]> {
    const accionesModel = await this.accionModel.find().exec();

    const acciones = accionesModel.map((accionModel) => {
      return this.toAccionSolidariaDomain(accionModel);
    });

    return acciones;
  }

  async update(id: string, item: AccionSolidaria): Promise<AccionSolidaria> {
    const accion = await this.accionModel.findByIdAndUpdate(id, item).exec();
    const accionUpdated = new AccionSolidaria({
      ...item,
      id: accion._id.toString(),
    });

    return accionUpdated;
  }

  async delete(id: string): Promise<AccionSolidaria> {
    const accion = await this.get(id);
    if (accion) {
      await this.accionModel.findByIdAndDelete(id).exec();
      return accion;
    }
  }
}
