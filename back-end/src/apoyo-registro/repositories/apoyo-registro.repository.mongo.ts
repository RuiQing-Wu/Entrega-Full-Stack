import { HydratedDocument, Model } from "mongoose";
import { ApoyoRegistro } from "../domain/apoyo-registro.damain";
import { ApoyoRegistroMongoModel } from "../schemas/apoyo-registro.schema";
import { ApoyoRegistroRepository } from "./apoyo-registro.repository";
import { InjectModel } from "@nestjs/mongoose";
import { RepositoryError } from "src/base/repositoryError";
import { EntityNotFoundError } from "src/base/entityNotFounError";

export class ApoyoRegistroRepositoryMongo implements ApoyoRegistroRepository {

    constructor(
        @InjectModel(ApoyoRegistro.name)
        private readonly apoyoRegistroModel: Model<ApoyoRegistroMongoModel>,
    ) {
    }

    private toApoyoRegistroDomain(apoyoRegistroMongo: HydratedDocument<ApoyoRegistroMongoModel>): ApoyoRegistro {
        if (apoyoRegistroMongo) {
            const apoyoRegistro = new ApoyoRegistro({
                idCausa: apoyoRegistroMongo.idCausa,
                nombre: apoyoRegistroMongo.nombre,
                correo: apoyoRegistroMongo.correo,
                id: apoyoRegistroMongo._id.toString(),
            });

            return apoyoRegistro;
        }
    }

    async create(item: ApoyoRegistro): Promise<ApoyoRegistro> {
        try {
            const createApoyoRegistroMongo = await this.apoyoRegistroModel.create(item);
            const newApoyoRegistro = new ApoyoRegistro({
                ...item,
                id: createApoyoRegistroMongo._id.toString(),
            });

            return newApoyoRegistro;
        } catch (error) {
            throw new RepositoryError('Error al crear el apoyo al registro');
        }
    }

    async get(id: string): Promise<ApoyoRegistro> {
        try {
            const apoyoRegistroMongo = await this.apoyoRegistroModel.findById(id).exec();
            if (apoyoRegistroMongo === null) {
                throw new EntityNotFoundError('Apoyo al registro no encontrado con id ' + id);
            }

            return this.toApoyoRegistroDomain(apoyoRegistroMongo);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw error;
            }

            throw new RepositoryError('Error al obtener el apoyo al registro con id ' + id);
        }
    }

    async getAll(): Promise<ApoyoRegistro[]> {
        try {
            const apoyoRegistrosMongo = await this.apoyoRegistroModel.find().exec();
            return apoyoRegistrosMongo.map((apoyoRegistroMongo) => this.toApoyoRegistroDomain(apoyoRegistroMongo));
        } catch (error) {
            throw new RepositoryError('Error al obtener los apoyos al registro de causas');
        }
    }

    async update(id: string, item: ApoyoRegistro): Promise<ApoyoRegistro> {
        try {
            const oldApoyoRegistro = await this.apoyoRegistroModel.findByIdAndUpdate(id, item).exec();
            const newApoyoRegistro = new ApoyoRegistro({
                ...item,
                id: oldApoyoRegistro._id.toString(),
            });

            return newApoyoRegistro;
        } catch (error) {
            throw new RepositoryError('Error al actualizar el apoyo al registro con id ' + id);
        }
    }

    async delete(id: string): Promise<ApoyoRegistro> {
        const apoyoRegistro = await this.get(id);

        try {
            if (apoyoRegistro) {
                await this.apoyoRegistroModel.findByIdAndDelete(id).exec();
                return apoyoRegistro;
            }
        } catch (error) {
            throw new RepositoryError('Error al eliminar el apoyo al registro con id ' + id);
        }
    }
}