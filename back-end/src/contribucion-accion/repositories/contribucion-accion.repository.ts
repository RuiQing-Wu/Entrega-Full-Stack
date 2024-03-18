import { IGenericRepository } from '../../base/generic.repository';
import { ContribucionAccion } from '../domain/contribucion-accion.domain';

export abstract class ContribucionAccionRepository extends IGenericRepository<ContribucionAccion> {
  abstract getByIdAccion(idAccion: string): Promise<ContribucionAccion[]>;
  abstract getByIdUsuario(idUsuario: string): Promise<ContribucionAccion[]>;
}
