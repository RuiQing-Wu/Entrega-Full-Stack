import { InjectModel } from '@nestjs/mongoose';
import { Solicitud } from '../domain/solicitud.domain';
import { SolicitudesRepository } from './solicitudes.repository';
import { SolicitudMongoModel } from '../schemas/solicitud.schema';
import { HydratedDocument, Model } from 'mongoose';
import { RepositoryError } from 'src/base/repositoryError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

export class SolicitudesRepositoryMongo implements SolicitudesRepository {
  constructor(
    @InjectModel(Solicitud.name)
    private readonly solicitudModel: Model<SolicitudMongoModel>,
  ) {}

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
    try {
      const createSolicitudMongo = await this.solicitudModel.create(item);
      const newSolicitud = new Solicitud({
        ...item,
        id: createSolicitudMongo._id.toString(),
      });

      return newSolicitud;
    } catch (error) {
      throw new RepositoryError('Error al crear la solicitud');
    }
  }

  async get(id: string): Promise<Solicitud> {
    try {
      const solicitud = await this.solicitudModel.findById(id).exec();

      if (solicitud === null) {
        throw new EntityNotFoundError('Solicitud no encontrada con id ' + id);
      }

      return this.toSolicitudDomain(solicitud);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener la solicitud con id ' + id);
    }
  }

  async getByUserIdAndCommunityId(
    idUsuario: string,
    idComunidad: string,
  ): Promise<Solicitud> {
    try {
      const solicitud = await this.solicitudModel
        .findOne({ idUsuario, idComunidad })
        .exec();

      if (solicitud === null) {
        throw new EntityNotFoundError(
          'Solicitud no encontrada con idUsuario ' +
            idUsuario +
            ' e idComunidad ' +
            idComunidad,
        );
      }

      return this.toSolicitudDomain(solicitud);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError(
        'Error al obtener la solicitud con idUsuario ' +
          idUsuario +
          ' e idComunidad ' +
          idComunidad,
      );
    }
  }

  async getAll(): Promise<Solicitud[]> {
    try {
      const solicitudesMongo = await this.solicitudModel.find().exec();

      return solicitudesMongo.map((solicitudMongo) =>
        this.toSolicitudDomain(solicitudMongo),
      );
    } catch (error) {
      throw new RepositoryError('Error al obtener las solicitudes');
    }
  }

  async update(id: string, item: Solicitud): Promise<Solicitud> {
    try {
      const solicitud = await this.solicitudModel
        .findByIdAndUpdate(id, item)
        .exec();
      const newSolicitud = new Solicitud({
        ...item,
        id: solicitud._id.toString(),
      });

      return newSolicitud;
    } catch (error) {
      throw new RepositoryError(
        'Error al actualizar la solicitud con id ' + id,
      );
    }
  }

  async delete(id: string): Promise<Solicitud> {
    const solicitud = await this.get(id);

    try {
      if (solicitud) {
        await this.solicitudModel.findByIdAndDelete(id).exec();
        return solicitud;
      }
    } catch (error) {
      throw new RepositoryError('Error al eliminar la solicitud con id ' + id);
    }
  }
}
