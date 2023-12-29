import { IGenericRepository } from 'src/base/generic.repository';
import {
  Comunidad,
  CausaSolidaria,
  AccionSolidaria,
} from '../domain/comunidades.domain';
import { InjectModel } from '@nestjs/mongoose';
import { ComunidadModel } from '../entities/comunidades.model';
import { Model } from 'mongoose';

export class ComunidadRepositoryMongose extends IGenericRepository<Comunidad> {
  constructor(
    @InjectModel(ComunidadModel.name)
    private readonly comunidadesRepository: Model<ComunidadModel>,
  ) {
    super();
  }

  // Transforma un objeto del modelo de persistencia en un objeto de dominio
  private toDomain(comunidadModel: ComunidadModel): Comunidad {
    const comunidad = new Comunidad({
      id: comunidadModel.id,
      nombre: comunidadModel.nombre,
      descripcion: comunidadModel.descripcion,
      fechaInicio: comunidadModel.fechaInicio,
      causas: comunidadModel.causas.map((causa) => {
        return new CausaSolidaria({
          id: causa.id,
          titulo: causa.titulo,
          descripcion: causa.descripcion,
          fechaInicio: causa.fechaInicio,
          fechaFin: causa.fechaFin,
          accionSolidaria: causa.acciones.map((accion) => {
            return new AccionSolidaria({
              id: accion.id,
              titulo: accion.titulo,
              descripcion: accion.descripcion,
              listaObjetivos: accion.listaObjetivos,
            });
          }),
        });
      }),
    });
    return comunidad;
  }

  async create(item: Comunidad): Promise<Comunidad> {
    // creamos un objeto de tipo ReunionModel a partir del objeto del dominio
    const comunidadModel: ComunidadModel =
      await this.comunidadesRepository.create(item);

    // Tras almacenarlo se obtiene el id
    const reunionCreated =
      await this.comunidadesRepository.create(comunidadModel);

    // creamos un objeto de tipo Reunion a partir de los datos de comunidadModel
    // En la creación no se almacenan ni causas ni acciones
    const comunidad = new Comunidad({
      id: reunionCreated.id,
      nombre: reunionCreated.nombre,
      descripcion: reunionCreated.descripcion,
      fechaInicio: reunionCreated.fechaInicio,
      causas: [],
    });

    return comunidad;
  }

  async get(id: string): Promise<Comunidad> {
    // convierte el id en número

    const comunidadModel = await this.comunidadesRepository.findById(id);

    // creamos un objeto de tipo Comunidad a partir de los datos del modelo de persistencia
    return this.toDomain(comunidadModel);
  }

  async getAll(): Promise<Comunidad[]> {
    const comunidadesModel = await this.comunidadesRepository.find();

    const comunidades = comunidadesModel.map((comunidadModel) => {
      return this.toDomain(comunidadModel);
    });
    return comunidades;
  }

  async update(id: string, item: Comunidad): Promise<Comunidad> {
    const comunidadModel = await this.comunidadesRepository.findById(id);
    if (comunidadModel) {
      // Actualiza la reunion con mongose
      await this.comunidadesRepository.findByIdAndUpdate(id, item);

      return this.toDomain(comunidadModel);
    }
  }

  async delete(id: string): Promise<Comunidad> {
    const comunidadModel = await this.comunidadesRepository.findById(id);
    if (comunidadModel) {
      // Elimina la reunion con mongose
      await this.comunidadesRepository.findByIdAndDelete(id);

      return this.toDomain(comunidadModel);
    }
  }
}
