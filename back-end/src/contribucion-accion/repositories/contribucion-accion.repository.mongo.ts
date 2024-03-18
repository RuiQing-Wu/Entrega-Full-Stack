import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { ContribucionAccion } from "../domain/contribucion-accion.domain";
import { ContribucionAccionRepository } from "../repositories/contribucion-accion.repository";
import { ContribucionMongoModel } from "../schemas/contribucion-accion.schema";
import { RepositoryError } from "src/base/repositoryError";
import { EntityNotFoundError } from "src/base/entityNotFounError";

export class ContribucionAccionRepositoryMongo implements ContribucionAccionRepository {

    constructor(
      @InjectModel(ContribucionAccion.name)
      private readonly contribucionModel: Model<ContribucionMongoModel>,
    ) {
  
    }

    private toContribucionAccionDomain(contribucionModel: HydratedDocument<ContribucionAccion>): ContribucionAccion {
        const contribucion = new ContribucionAccion({
          id: contribucionModel._id.toString(),
          idAccion: contribucionModel.idAccion,
          idUsuario: contribucionModel.idUsuario,
          nombre: contribucionModel.nombre,
          email: contribucionModel.email,
          contribucion: contribucionModel.contribucion,
        });
    
        return contribucion;
      }

    async create(item: ContribucionAccion): Promise<ContribucionAccion> {
        try {
            const contribucionCreated = await this.contribucionModel.create(item);
            const contribucion = new ContribucionAccion({
              ...item,
              id: contribucionCreated._id.toString(),
            });
      
            return contribucion;
          }
          catch (error) {
            throw new RepositoryError('Error al registrar la contribucion');
          }
    }

    async get(id: string): Promise<ContribucionAccion> {
        try {
            const contribucionesModel = await this.contribucionModel.findById(id).exec();
      
            if (contribucionesModel === null) {
                throw new EntityNotFoundError('Contribucion no encontrada con id ' + id);
              }
        
              return this.toContribucionAccionDomain(contribucionesModel);
          } catch (error) {
            throw new RepositoryError('Error al obtener la contribucion con id' + id);
          }
    }

    async getByIdAccion(idAccion: string): Promise<ContribucionAccion[]> {
        const contribucionesModel = await this.contribucionModel.find({ idAccion }).exec();
        try{
            const contribuciones = contribucionesModel.map((contribucionModel) => {
                return this.toContribucionAccionDomain(contribucionModel);
            });

            return contribuciones;
        } catch (error) {
            throw new RepositoryError('Error al obtener la contribucion con id accion ' + idAccion);
        }
    }

    async getByIdUsuario(idUsuario: string): Promise<ContribucionAccion[]> {
        const contribucionesModel = await this.contribucionModel.find({ idUsuario }).exec();
        try{
            const contribuciones = contribucionesModel.map((contribucionModel) => {
                return this.toContribucionAccionDomain(contribucionModel);
            });

            return contribuciones;
        } catch (error) {
            throw new RepositoryError('Error al obtener la contribucion con id usuario ' + idUsuario);
        }
    }

    async getAll(): Promise<ContribucionAccion[]> {
        try {
            const contribucionesModel = await this.contribucionModel.find().exec();
      
            const contribuciones = contribucionesModel.map((contribucionModel) => {
              return this.toContribucionAccionDomain(contribucionModel);
            });
      
            return contribuciones;
          } catch (error) {
            throw new RepositoryError('Error al obtener las contribuciones');
          }
    }

    async update(id: string, item: ContribucionAccion): Promise<ContribucionAccion> {
        try {
            const contribucion = await this.contribucionModel.findByIdAndUpdate(id, item).exec();
            const contribucionUpdated = new ContribucionAccion({
              ...item,
              id: contribucion._id.toString(),
            });
      
            return contribucionUpdated;
          }
          catch (error) {
            throw new RepositoryError('Error al actualizar la contribucion con id ' + id);
          }
    }

    async delete(id: string): Promise<ContribucionAccion> {
        const contribucion = await this.get(id);

    try {
      if (contribucion) {
        await this.contribucionModel.findByIdAndDelete(id).exec();
        return contribucion;
      }
    }
    catch (error) {
      throw new RepositoryError('Error al eliminar la contribucion con id ' + id);
    }
    }
}
