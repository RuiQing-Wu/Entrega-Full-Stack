import { IGenericRepository } from "src/base/generic.repository";
import { AccionSolidaria } from "../domain/accion_solidaria.domain";

export abstract class AccionesRepository extends IGenericRepository<AccionSolidaria> {
    abstract getByName(titulo: string): Promise<AccionSolidaria>;
}

