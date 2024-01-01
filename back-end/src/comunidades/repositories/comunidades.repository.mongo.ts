import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ComunidadesRepository } from "./comunidades.repository";
import { Comunidad } from "../domain/comunidades.domain";
import { ComunidadMongoModel } from "../schemas/comunidad.schema";

export class ComunidadesRepositoryMongo extends ComunidadesRepository {

    constructor(
        @InjectModel(Comunidad.name)
        private readonly comunidadModel: Model<ComunidadMongoModel>,
    ) {
        super();
    }

    getByName(name: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async create(item: Comunidad): Promise<Comunidad> {
        throw new Error("Method not implemented.");
    }

    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}