import { IGenericRepository } from '../../base/generic.repository';
import { AccionSolidaria } from '../domain/accion_solidaria.domain';

export abstract class AccionesRepository extends IGenericRepository<AccionSolidaria> {
  abstract getByName(titulo: string): Promise<AccionSolidaria>;
  abstract getByCausaId(causa: string): Promise<AccionSolidaria[]>;
  abstract getByNameInsensitivePartial(
    titulo: string,
    idCausa: string,
  ): Promise<AccionSolidaria[]>;
}
