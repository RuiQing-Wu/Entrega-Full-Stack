import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CausasRepository } from "./causas.repository";
import { CausaSolidaria } from "../domain/causa_solidaria.domain";
import { CausaMongoModel } from "../schemas/causa.schema";

export class CausasRepositoryMongo extends CausasRepository {

    constructor(
        @InjectModel(CausaSolidaria.name)
        private readonly causaModel: Model<CausaMongoModel>,
    ) {
        super();
    }

    getByName(name: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async create(item: CausaSolidaria): Promise<CausaSolidaria> {
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