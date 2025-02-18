import { IGenericRepository } from 'src/base/generic.repository';
import { CausaSolidaria } from '../domain/causa_solidaria.domain';

export abstract class CausasRepository extends IGenericRepository<CausaSolidaria> {
  abstract getByName(name: string): Promise<CausaSolidaria>;
  abstract getByComunidadId(comunidad: string): Promise<CausaSolidaria[]>;
  abstract getByNameInsensitivePartial(
    titulo: string,
    idComunidad: string,
  ): Promise<CausaSolidaria[]>;
}
