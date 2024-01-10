import { ApoyoCausa } from "../domain/apoyo-causa.domain";
import { CreateApoyoCausaDto } from "../dto/create-apoyo-causa.dto";
import { UpdateApoyoCausaDto } from "../dto/update-apoyo-causa.dto";

export abstract class IApoyoCausaService {
    abstract create(createApoyoCausaDto: CreateApoyoCausaDto): Promise<ApoyoCausa>;
    abstract findAll(): Promise<ApoyoCausa[]>;
    abstract findOne(id: string): Promise<ApoyoCausa>;
    abstract update(id: string, updateApoyoCausaDto: UpdateApoyoCausaDto);
    abstract remove(id: string): Promise<ApoyoCausa>;

    abstract get(prefix: string, key: string): Promise<number | 0>;
    abstract incr(prefix: string, key: string): Promise<number | -1>;
    abstract delete(prefix: string, key: string): Promise<void>;
  }
  