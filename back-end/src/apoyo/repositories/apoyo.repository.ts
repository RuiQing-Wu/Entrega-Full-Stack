import { IGenericRepository } from "src/base/generic.repository";
import { ApoyoCausa } from "../domain/apoyoCausa.domain";

export abstract class ApoyoRepository extends IGenericRepository<ApoyoCausa> {
    abstract getApoyo(comunidadId: string, causaId: string): Promise<number>;
    abstract increaseApoyo(comunidadId: string, causaId: string): Promise<number>;
    abstract deleteCausa(comunidadId: string, causaId: string): Promise<void>;
}

