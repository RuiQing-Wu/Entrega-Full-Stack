import { InjectModel } from "@nestjs/mongoose";
import { Solicitud } from "../domain/solicitud.domain";
import { SolicitudesRepository } from "./solicitudes.repository";
import { SolicitudMongoModel } from "../schemas/solicitud.schema";
import { Model } from "mongoose";

export class SolicitudesRepositoryMongo extends SolicitudesRepository {
    constructor(
        @InjectModel(Solicitud.name)
        private readonly solicitudModel: Model<SolicitudMongoModel>,
    ) {
        super();
    }
    
    getByNombre(nombre: string): Promise<Solicitud> {
        throw new Error("Method not implemented.");
    }

    create(item: Solicitud): Promise<Solicitud> {
        throw new Error("Method not implemented.");
    }

    get(id: string): Promise<Solicitud> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<Solicitud[]> {
        throw new Error("Method not implemented.");
    }

    update(id: string, item: Solicitud): Promise<Solicitud> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<Solicitud> {
        throw new Error("Method not implemented.");
    }
}