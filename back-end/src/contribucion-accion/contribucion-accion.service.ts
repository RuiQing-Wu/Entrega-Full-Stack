import { Inject, Injectable } from '@nestjs/common';
import { IContribucionAccionService } from './interfaces/contribucion-accion.service.interface';
import { ContribucionAccion } from './domain/contribucion-accion.domain';
import { ContribucionAccionRepository } from './repositories/contribucion-accion.repository';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@Injectable()
export class ContribucionAccionService implements IContribucionAccionService{
    constructor(
        @Inject(ContribucionAccionRepository)
        private contribucionAccionRepository: ContribucionAccionRepository,
    ) {}
    
    crearContribucionAccion(data: ContribucionAccion): Promise<ContribucionAccion> {
        let contribucionExistente;
        try {
            contribucionExistente = this.contribucionAccionRepository.getByIdAccion(data.idAccion);
            if(contribucionExistente.idUsuario !== data.idUsuario){
                contribucionExistente = null;
            }
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                contribucionExistente = null;
              }
              else {
                throw error;
              }
        }

        if(contribucionExistente){
            throw new EntityNotFoundError('Ya has realizado una contribución para esa acción');
        }
        return this.contribucionAccionRepository.create(data);
    }

    async listarContribuciones(): Promise<ContribucionAccion[]> {
        return await this.contribucionAccionRepository.getAll();
    }

    async getContribucionByID(id: string): Promise<ContribucionAccion> {
        return await this.contribucionAccionRepository.get(id);
    }

    async getContribucionesByIDAccion(idAccion: string): Promise<ContribucionAccion[]> {
        return await this.contribucionAccionRepository.getByIdAccion(idAccion);
    }

    async getContribucionesByIDUsuario(idUsuario: string): Promise<ContribucionAccion[]> {
        return await this.contribucionAccionRepository.getByIdUsuario(idUsuario);
    }
}
