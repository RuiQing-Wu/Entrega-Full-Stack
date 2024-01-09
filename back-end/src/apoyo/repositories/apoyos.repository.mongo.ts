import { HydratedDocument, Model } from "mongoose";
import { ApoyoRegistro } from "../domain/apoyo.damain";
import { ApoyoRegistroMongoModel } from "../schemas/apoyo.schema";
import { ApoyoRegistroRepository } from "./apoyos.reposiroty";
import { InjectModel } from "@nestjs/mongoose";

export class ApoyoRegistroRepositoryMongo extends ApoyoRegistroRepository {

    constructor(
        @InjectModel(ApoyoRegistro.name)
        private readonly apoyoRegistroModel: Model<ApoyoRegistroMongoModel>,
    ) {
        super();
    }

    private toApoyoRegistrodDomain(apoyoRegistroMongo: HydratedDocument<ApoyoRegistroMongoModel>): ApoyoRegistro {
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

    get(id: string): Promise<ApoyoRegistro> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<ApoyoRegistro[]> {
        throw new Error("Method not implemented.");
    }

    update(id: string, item: ApoyoRegistro): Promise<ApoyoRegistro> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<ApoyoRegistro> {
        throw new Error("Method not implemented.");
    }
}