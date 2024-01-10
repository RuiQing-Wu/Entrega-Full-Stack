import { Inject, Injectable } from '@nestjs/common';
import { IApoyoService } from './interfaces/apoyoCausa.interface';
import { ApoyoRepository } from './repositories/apoyoCausa.repository';
import { ApoyoCausa } from './domain/apoyoCausa.domain';

@Injectable()
export class ApoyoService implements IApoyoService {
    constructor(@Inject(ApoyoRepository) private readonly apoyoRepository: ApoyoRepository) {}

    async get(comunidadId: string, causaId: string): Promise<number | 0> {
        return await this.apoyoRepository.getApoyo(comunidadId, causaId);
    }

    async incr(comunidadId: string, causaId: string) {
        return await this.apoyoRepository.increaseApoyo(comunidadId, causaId);
    }

    async delete(comunidadId: string, causaId: string) {
        return await this.apoyoRepository.deleteCausa(comunidadId, causaId);
    }
}
