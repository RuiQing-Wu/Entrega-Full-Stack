import { CreateComunidadDto } from '../dto/create-comunidad.dto';
import { UpdateComunidadDto } from '../dto/update-comunidad.dto';
import { Comunidad } from '../domain/comunidades.domain';

export abstract class IComunidadesService {
  abstract create(createComunidadDto: CreateComunidadDto): Promise<Comunidad>;
  abstract findAll(): Promise<Comunidad[]>;
  abstract findOne(id: string): Promise<Comunidad>;
  abstract update(
    id: string,
    updateComunidadDto: UpdateComunidadDto,
  ): Promise<Comunidad>;
  abstract remove(id: string): Promise<Comunidad>;
  abstract getByName(nombre: string): Promise<Comunidad>;
  abstract getByNameInsensitivePartial(nombre: string): Promise<Comunidad[]>;
  abstract getByCategoryInsensitivePartial(
    categoria: string,
  ): Promise<Comunidad[]>;
  abstract addMember(
    idComunidad: string,
    idUsuario: string,
  ): Promise<Comunidad>;
  abstract removeMember(
    idComunidad: string,
    idUsuario: string,
  ): Promise<Comunidad>;
  abstract getByYear(year: number): Promise<Comunidad[]>;
  abstract getComunidadesByUser(idUsuario: string): Promise<Comunidad[]>;
}
