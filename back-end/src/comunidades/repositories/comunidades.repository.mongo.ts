import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ComunidadesRepository } from './comunidades.repository';
import { Comunidad } from '../domain/comunidades.domain';
import { ComunidadMongoModel } from '../schemas/comunidad.schema';

export class ComunidadesRepositoryMongo implements ComunidadesRepository {
  constructor(
    @InjectModel(Comunidad.name)
    private readonly comunidadModel: Model<ComunidadMongoModel>,
  ) {}

  //Transforma un objeto del modelo de persistencia en un objeto de dominio
  private toComunidadDomain(comunidadModel: HydratedDocument<ComunidadMongoModel>): Comunidad {
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
    const comunidadCreated = await this.comunidadModel.create(item);

    // TODO: asignar con el objeto
    const comunidad = new Comunidad({
      id: comunidadCreated._id.toString(),
      nombre: comunidadCreated.nombre,
      descripcion: comunidadCreated.descripcion,
      fechaInicio: comunidadCreated.fechaInicio,
      idAdministrador: comunidadCreated.idAdministrador,
      usuarios: comunidadCreated.usuarios,
    });

    return comunidad;
  }

  async get(id: string): Promise<Comunidad> {
    const comunidad = await this.comunidadModel.findById(id).exec();

    return this.toComunidadDomain(comunidad);
  }

  async getByName(name: string): Promise<Comunidad> {
    const comunidad = await this.comunidadModel.findOne({ nombre: name });
    return this.toComunidadDomain(comunidad);
  }

  async getByNameInsensitivePartial(nombre: string): Promise<Comunidad[]> {
    const comunidades = await this.comunidadModel.find({
      nombre: { $regex: nombre, $options: 'i' },
    });
    return comunidades.map((comunidad) => {
      return this.toComunidadDomain(comunidad);
    });
  }

  async getAll(): Promise<any[]> {
    const comunidadesModel = await this.comunidadModel.find().exec();

    const comunidades = comunidadesModel.map((comunidadModel) => {
      return this.toComunidadDomain(comunidadModel);
    });

    return comunidades;
  }

  async getComunidadesByUser(idUsuario: string): Promise<Comunidad[]> {
    const comunidades = await this.comunidadModel.find({
      usuarios: { $in: [idUsuario] },
    });
    return comunidades.map((comunidad) => {
      return this.toComunidadDomain(comunidad);
    });
  }

  /* async addMember(idComunidad: string, idUsuario: string): Promise<Comunidad> {
    const comunidad = await this.comunidadModel.findById(idComunidad).exec();
    comunidad.usuarios.push(idUsuario);
    await comunidad.save();
    return this.transform(comunidad);
  } */

  async update(id: string, item: Comunidad): Promise<Comunidad> {
    const comunidad = await this.comunidadModel.findByIdAndUpdate(id, item).exec();
    const comunidadUpdated = new Comunidad({
      ...item,
      id: comunidad._id.toString(),
    });

    return comunidadUpdated;
  }

  async delete(id: string): Promise<Comunidad> {
    const comunidad = await this.get(id);
    
    if (comunidad) {
      await this.comunidadModel.findByIdAndDelete(id).exec();
      return comunidad;
    }
  }
}
