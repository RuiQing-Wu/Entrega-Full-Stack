import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AccionesRepository } from './acciones.repository';
import { AccionSolidaria } from '../domain/accion_solidaria.domain';
import { AccionMongoModel } from '../schemas/accion.schema';

export class AccionesRepositoryMongo extends AccionesRepository {
  constructor(
    @InjectModel(AccionSolidaria.name)
    private readonly accionModel: Model<AccionMongoModel>,
  ) {
    super();
  }

  transform(accionModel: AccionMongoModel): AccionSolidaria {
    const accion = new AccionSolidaria({
      id: accionModel.id,
      titulo: accionModel.titulo,
      descripcion: accionModel.descripcion,
      listaObjetivos: accionModel.listaObjetivos,
      progreso: accionModel.progreso,
      causa: accionModel.causa,
    });
    return accion;
  }

  async create(item: AccionSolidaria): Promise<AccionSolidaria> {
    const accionModel: AccionMongoModel = await this.accionModel.create(item);

    const accionCreated = await this.accionModel.create(accionModel);

    const accion = new AccionSolidaria({
      id: accionCreated.id,
      titulo: accionCreated.titulo,
      descripcion: accionCreated.descripcion,
      listaObjetivos: accionCreated.listaObjetivos,
      progreso: accionCreated.progreso,
      causa: accionCreated.causa,
    });

    return accion;
  }

  async get(id: string): Promise<AccionSolidaria> {
    const accion = await this.accionModel.findById(id).exec();

    return this.transform(accion);
  }

  async getByName(titulo: string): Promise<AccionSolidaria> {
    const accion = await this.accionModel.findOne({ titulo }).exec();

    return this.transform(accion);
  }

  async getAll(): Promise<AccionSolidaria[]> {
    const accionesModel = await this.accionModel.find().exec();

    const acciones = accionesModel.map((accionModel) => {
      return this.transform(accionModel);
    });

    return acciones;
  }

  update(id: string, item: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
