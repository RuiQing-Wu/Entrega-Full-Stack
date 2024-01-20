import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ComunidadesRepository } from './comunidades.repository';
import { Comunidad } from '../domain/comunidades.domain';
import { ComunidadMongoModel } from '../schemas/comunidad.schema';
import { RepositoryError } from 'src/base/repositoryError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

export class ComunidadesRepositoryMongo implements ComunidadesRepository {
  constructor(
    @InjectModel(Comunidad.name)
    private readonly comunidadModel: Model<ComunidadMongoModel>,
  ) {}

  //Transforma un objeto del modelo de persistencia en un objeto de dominio
  private toComunidadDomain(
    comunidadModel: HydratedDocument<ComunidadMongoModel>,
  ): Comunidad {
    if (comunidadModel) {
      const comunidad = new Comunidad({
        id: comunidadModel._id.toString(),
        nombre: comunidadModel.nombre,
        descripcion: comunidadModel.descripcion,
        fechaInicio: comunidadModel.fechaInicio,
        idAdministrador: comunidadModel.idAdministrador,
        usuarios: comunidadModel.usuarios,
      });

      return comunidad;
    }
  }

  async create(item: Comunidad): Promise<Comunidad> {
    try {
      const comunidadCreated = await this.comunidadModel.create(item);

      const comunidad = new Comunidad({
        ...item,
        id: comunidadCreated._id.toString(),
      });

      return comunidad;
    } catch (error) {
      throw new RepositoryError('Error al crear la comunidad');
    }
  }

  async get(id: string): Promise<Comunidad> {
    try {
      const comunidad = await this.comunidadModel.findById(id).exec();

      if (comunidad === null) {
        throw new EntityNotFoundError('Comunidad no encontrada con id ' + id);
      }

      return this.toComunidadDomain(comunidad);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener la comunidad con id ' + id);
    }
  }

  async getByName(name: string): Promise<Comunidad> {
    try {
      const comunidad = await this.comunidadModel.findOne({ nombre: name });
      if (comunidad === null) {
        throw new EntityNotFoundError(
          'Comunidad no encontrada con nombre ' + name,
        );
      }

      return this.toComunidadDomain(comunidad);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError(
        'Error al obtener la comunidad con nombre ' + name,
      );
    }
  }

  async getByNameInsensitivePartial(nombre: string): Promise<Comunidad[]> {
    try {
      const comunidades = await this.comunidadModel.find({
        nombre: { $regex: nombre, $options: 'i' },
      });

      return comunidades.map((comunidad) => {
        return this.toComunidadDomain(comunidad);
      });
    } catch (error) {
      throw new RepositoryError(
        'Error al obtener las comunidades con nombre ' + nombre,
      );
    }
  }

  async getAll(): Promise<Comunidad[]> {
    try {
      const comunidadesModel = await this.comunidadModel.find().exec();

      const comunidades = comunidadesModel.map((comunidadModel) => {
        return this.toComunidadDomain(comunidadModel);
      });

      return comunidades;
    } catch (error) {
      throw new RepositoryError('Error al obtener las comunidades');
    }
  }

  async getComunidadesByUser(idUsuario: string): Promise<Comunidad[]> {
    try {
      const comunidades = await this.comunidadModel.find({
        usuarios: { $in: [idUsuario] },
      });

      return comunidades.map((comunidad) => {
        return this.toComunidadDomain(comunidad);
      });
    } catch (error) {
      throw new RepositoryError(
        'Error al obtener las comunidades del usuario con id ' + idUsuario,
      );
    }
  }

  async update(id: string, item: Comunidad): Promise<Comunidad> {
    try {
      const comunidad = await this.comunidadModel
        .findByIdAndUpdate(id, item)
        .exec();
      const comunidadUpdated = new Comunidad({
        ...item,
        id: comunidad._id.toString(),
      });

      return comunidadUpdated;
    } catch (error) {
      throw new RepositoryError(
        'Error al actualizar la comunidad con id ' + id,
      );
    }
  }

  async delete(id: string): Promise<Comunidad> {
    const comunidad = await this.get(id);

    try {
      if (comunidad) {
        await this.comunidadModel.findByIdAndDelete(id).exec();
        return comunidad;
      }
    } catch (error) {
      throw new RepositoryError('Error al eliminar la comunidad con id ' + id);
    }
  }
}
