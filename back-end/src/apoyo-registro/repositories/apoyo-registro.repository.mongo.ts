import { HydratedDocument, Model } from "mongoose";
import { ApoyoRegistro } from "../domain/apoyo-registro.damain";
import { ApoyoRegistroMongoModel } from "../schemas/apoyo-registro.schema";
import { ApoyoRegistroRepository } from "./apoyo-registro.repository";
import { InjectModel } from "@nestjs/mongoose";

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
        const createApoyoRegistroMongo = await this.apoyoRegistroModel.create(item);
        const newApoyoRegistro = new ApoyoRegistro({
            ...item,
            id: createApoyoRegistroMongo._id.toString(),
        });

        return newApoyoRegistro;
    }

    async get(id: string): Promise<ApoyoRegistro> {
        const  apoyoRegistroMongo = await this.apoyoRegistroModel.findById(id).exec();
        return this.toApoyoRegistroDomain(apoyoRegistroMongo);
    }

    async getAll(): Promise<ApoyoRegistro[]> {
        const apoyoRegistrosMongo = await this.apoyoRegistroModel.find().exec();
        return apoyoRegistrosMongo.map((apoyoRegistroMongo) => this.toApoyoRegistroDomain(apoyoRegistroMongo));
    }

    async update(id: string, item: ApoyoRegistro): Promise<ApoyoRegistro> {
        const oldApoyoRegistro = await this.apoyoRegistroModel.findByIdAndUpdate(id, item).exec();
        const newApoyoRegistro = new ApoyoRegistro({
            ...item,
            id: oldApoyoRegistro._id.toString(),
        });

        return newApoyoRegistro;
    }

    delete(id: string): Promise<ApoyoRegistro> {
        const apoyoRegistro = this.get(id);
        
        if (apoyoRegistro) {
            this.apoyoRegistroModel.findByIdAndDelete(id).exec();
            return apoyoRegistro;
        }
    }
}