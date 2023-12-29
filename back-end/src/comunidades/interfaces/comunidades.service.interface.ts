import { CreateComunidadDto } from '../dto/create-comunidad.dto';
import { UpdateComunidadDto } from '../dto/update-comunidad.dto';
import { Comunidad } from '../domain/comunidades.domain';
import { CreateCausaDto } from '../dto/create-causa.dto';

export abstract class IComunidadesService {
  abstract create(createReunioneDto: CreateComunidadDto): Promise<Comunidad>;
  abstract findAll(): Promise<Comunidad[]>;
  abstract findOne(id: string): Promise<Comunidad>;
  abstract update(id: string, updateReunioneDto: UpdateComunidadDto);
  // abstract addCausa(id: string, causa: CreateCausaDto): Promise<Comunidad>;
  abstract remove(id: string): Promise<Comunidad>;
}
