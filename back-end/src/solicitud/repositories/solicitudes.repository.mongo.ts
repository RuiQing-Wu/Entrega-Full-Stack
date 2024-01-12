import { InjectModel } from '@nestjs/mongoose';
import { Solicitud } from '../domain/solicitud.domain';
import { SolicitudesRepository } from './solicitudes.repository';
import { SolicitudMongoModel } from '../schemas/solicitud.schema';
import { HydratedDocument, Model } from 'mongoose';

export class SolicitudesRepositoryMongo extends SolicitudesRepository {
  constructor(
    @InjectModel(Solicitud.name)
    private readonly solicitudModel: Model<SolicitudMongoModel>,
  ) {
    super();
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

  update(id: string, item: Solicitud): Promise<Solicitud> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<Solicitud> {
    throw new Error('Method not implemented.');
  }

  getByNombre(nombre: string): Promise<Solicitud> {
    throw new Error('Method not implemented.');
  }
}
