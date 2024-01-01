import { AccionSolidaria } from "../domain/accion_solidaria.domain";
import { CreateAccionDto } from "../dto/create-accione.dto";
import { UpdateAccionDto } from "../dto/update-accione.dto";

export abstract class IAccionService {
    abstract create(createAccionDto: CreateAccionDto): Promise<AccionSolidaria>;
    abstract findAll(): Promise<AccionSolidaria[]>;
    abstract findOne(id: string): Promise<AccionSolidaria>;
    abstract update(id: string, updateAccionDto: UpdateAccionDto);
    abstract remove(id: string): Promise<AccionSolidaria>;
}