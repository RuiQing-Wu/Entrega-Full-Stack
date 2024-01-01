import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AccionesRepository } from "./acciones.repository";
import { AccionSolidaria } from "../domain/accion_solidaria.domain";
import { AccionMongoModel } from "../schemas/accion.schema";

export class AccionesRepositoryMongo extends AccionesRepository {

    constructor(
        @InjectModel(AccionSolidaria.name)
        private readonly accionModel: Model<AccionMongoModel>,
    ) {
        super();
    }

    getByName(name: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async create(item: AccionSolidaria): Promise<AccionSolidaria> {
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