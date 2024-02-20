import { IGenericRepository } from 'src/base/generic.repository';
import { ApoyoCausa } from '../domain/apoyo-causa.domain';

export abstract class ApoyoCausaRepository extends IGenericRepository<ApoyoCausa> {
  abstract apoyar(id: string): Promise<ApoyoCausa>;
  abstract getByNumApoyo(numApoyo: number): Promise<ApoyoCausa[]>;
}
