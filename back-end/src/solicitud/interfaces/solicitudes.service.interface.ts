import { Solicitud } from "../domain/solicitud.domain";
import { CreateSolicitudDto } from "../dto/create-solicitud.dto";
import { UpdateSolicitudDto } from "../dto/update-solicitud.dto";

export abstract class ISolicitudesService {
    abstract create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud>;
    abstract findAll(): Promise<Solicitud[]>;
    abstract findOne(id: string): Promise<Solicitud>;
    abstract update(id: string, updateSolicitudDto: UpdateSolicitudDto);
    abstract remove(id: string): Promise<Solicitud>;
}