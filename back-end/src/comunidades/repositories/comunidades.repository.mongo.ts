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

    //Transforma un objeto del modelo de persistencia en un objeto de dominio
    private transform(comunidadModel: ComunidadMongoModel): Comunidad {
        const comunidad = new Comunidad({
            id: comunidadModel.id,
            nombre: comunidadModel.nombre,
            descripcion: comunidadModel.descripcion,
            fechaInicio: comunidadModel.fechaInicio,
            causas: comunidadModel.causas,
        });
        return comunidad;
    }

    async create(item: Comunidad): Promise<Comunidad> {
        // creamos un objeto de tipo ReunionModel a partir del objeto del dominio
        const comunidadModel: ComunidadMongoModel =
            await this.comunidadModel.create(item);

        // Tras almacenarlo se obtiene el id
        const reunionCreated =
            await this.comunidadModel.create(comunidadModel);

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
        const comunidad = await this.comunidadModel.findById(id).exec();

        return this.transform(comunidad);
    }

    async getByName(name: string): Promise<Comunidad> {
        const comunidad = await this.comunidadModel.findOne({ nombre:name });
        return this.transform(comunidad);
    }

    async getAll(): Promise<any[]> {
        const comunidadesModel = await this.comunidadModel.find().exec();

        const comunidades = comunidadesModel.map((comunidadModel) => {
            return this.transform(comunidadModel);
        });

        return comunidades;
    }

    update(id: string, item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}