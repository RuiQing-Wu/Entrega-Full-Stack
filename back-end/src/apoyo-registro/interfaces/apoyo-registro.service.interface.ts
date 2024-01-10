import { ApoyoRegistro } from "../domain/apoyo-registro.damain";
import { CreateApoyoRegistroDto } from "../dto/create-apoyo-registro.dto";
import { UpdateApoyoRegistroDto } from "../dto/update-apoyo-registro.dto";


export abstract class IApoyoRegistroService {
    abstract create(CreateApoyoDto: CreateApoyoRegistroDto): Promise<ApoyoRegistro>;
    abstract findAll(): Promise<ApoyoRegistro[]>;
    abstract findOne(id: string): Promise<ApoyoRegistro>;
    abstract update(id: string, updateCausaDto: UpdateApoyoRegistroDto);
    abstract remove(id: string): Promise<ApoyoRegistro>;
}