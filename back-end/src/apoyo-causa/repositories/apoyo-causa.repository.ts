import { IGenericRepository } from "src/base/generic.repository";
import { ApoyoCausa } from "../domain/apoyo-causa.domain";

export abstract class ApoyoCausaRepository extends IGenericRepository<ApoyoCausa> {
    abstract getApoyo(comunidadId: string, causaId: string): Promise<number>;
    abstract increaseApoyo(comunidadId: string, causaId: string): Promise<number>;
    abstract deleteCausa(comunidadId: string, causaId: string): Promise<void>;
}

