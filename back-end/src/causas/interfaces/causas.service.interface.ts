import { CausaSolidaria } from "../domain/causa_solidaria.domain";
import { CreateCausaDto } from "../dto/create-causa.dto";
import { UpdateCausaDto } from "../dto/update-causa.dto";

export abstract class ICausasService {
    abstract create(createCausaDto: CreateCausaDto): Promise<CausaSolidaria>;
    abstract findAll(): Promise<CausaSolidaria[]>;
    abstract findOne(id: string): Promise<CausaSolidaria>;
    abstract getByName(nombre: string): Promise<CausaSolidaria[]>;
    abstract getByComunidadId(comunidad: string): Promise<CausaSolidaria[]>;
    abstract update(id: string, updateCausaDto: UpdateCausaDto);
    abstract remove(id: string): Promise<CausaSolidaria>;
}