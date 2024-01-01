import { CreateComunidadDto } from '../dto/create-comunidad.dto';
import { UpdateComunidadDto } from '../dto/update-comunidad.dto';
import { Comunidad } from '../domain/comunidades.domain';

export abstract class IComunidadesService {
  abstract create(createComunidadDto: CreateComunidadDto): Promise<Comunidad>;
  abstract findAll(): Promise<Comunidad[]>;
  abstract findOne(id: string): Promise<Comunidad>;
  abstract update(id: string, updateComunidadDto: UpdateComunidadDto);
  // abstract addCausa(id: string, causa: CreateCausaDto): Promise<Comunidad>;
  abstract remove(id: string): Promise<Comunidad>;
}
