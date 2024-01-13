import { InjectModel } from '@nestjs/mongoose';
import { Solicitud } from '../domain/solicitud.domain';
import { SolicitudesRepository } from './solicitudes.repository';
import { SolicitudMongoModel } from '../schemas/solicitud.schema';
import { HydratedDocument, Model } from 'mongoose';

export class SolicitudesRepositoryMongo implements SolicitudesRepository {
  constructor(
    @InjectModel(Solicitud.name)
    private readonly solicitudModel: Model<SolicitudMongoModel>,
  ) {

  }

  private toSolicitudDomain(
    solicitudMongo: HydratedDocument<SolicitudMongoModel>,
  ): Solicitud {
    if (solicitudMongo) {
      const solicitud = new Solicitud({
        descripcion: solicitudMongo.descripcion,
        fechaSolicitud: solicitudMongo.fechaSolicitud,
        estado: solicitudMongo.estado,
        idUsuario: solicitudMongo.idUsuario,
        idComunidad: solicitudMongo.idComunidad,
        id: solicitudMongo._id.toString(),
      });

      return solicitud;
    }
  }

  async create(item: Solicitud): Promise<Solicitud> {
    const createSolicitudMongo = await this.solicitudModel.create(item);
    const newSolicitud = new Solicitud({
      ...item,
      id: createSolicitudMongo._id.toString(),
    });

    return newSolicitud;
  }

  async get(id: string): Promise<Solicitud> {
    const solicitud = await this.solicitudModel.findById(id).exec();

    return this.toSolicitudDomain(solicitud);
  }

  async getAll(): Promise<Solicitud[]> {
    const solicitudesMongo = await this.solicitudModel.find().exec();
    return solicitudesMongo.map((solicitudMongo) =>
      this.toSolicitudDomain(solicitudMongo),
    );
  }

  async update(id: string, item: Solicitud): Promise<Solicitud> {
    const solicitud = await this.solicitudModel.findByIdAndUpdate(id, item).exec();
    const newSolicitud = new Solicitud({
      ...item,
      id: solicitud._id.toString(),
    });

    return newSolicitud;
  }

  async delete(id: string): Promise<Solicitud> {
    const solicitud = await this.get(id);
    
    if (solicitud) {
      await this.solicitudModel.findByIdAndDelete(id).exec();
      return solicitud;
    }
  }
}
