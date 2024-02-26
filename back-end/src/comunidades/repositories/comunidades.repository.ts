import { IGenericRepository } from 'src/base/generic.repository';
import { Comunidad } from '../domain/comunidades.domain';

export abstract class ComunidadesRepository extends IGenericRepository<Comunidad> {
  abstract getByName(name: string): Promise<Comunidad>;
  abstract getByNameInsensitivePartial(name: string): Promise<Comunidad[]>;
  abstract getByCategoryInsensitivePartial(
    category: string,
  ): Promise<Comunidad[]>;
  abstract getByYear(year: number): Promise<Comunidad[]>;
  abstract deleteMember(
    idComunidad: string,
    idUsuario: string,
  ): Promise<Comunidad>;
  abstract getComunidadesByUser(idUsuario: string): Promise<Comunidad[]>;
}
