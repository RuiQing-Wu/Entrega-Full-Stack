import { IGenericRepository } from "src/base/generic.repository";
import { Solicitud } from "../domain/solicitud.domain";

export abstract class SolicitudesRepository extends IGenericRepository<Solicitud> {
    abstract getByNombre(nombre: string): Promise<Solicitud>;
}