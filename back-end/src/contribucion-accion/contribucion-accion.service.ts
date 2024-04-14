import { Inject, Injectable } from '@nestjs/common';
import { IContribucionAccionService } from './interfaces/contribucion-accion.service.interface';
import { ContribucionAccion } from './domain/contribucion-accion.domain';
import { ContribucionAccionRepository } from './repositories/contribucion-accion.repository';
import { EntityNotFoundError } from 'src/base/entityNotFounError';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE } from 'src/nats/nats.clients';

@Injectable()
export class ContribucionAccionService implements IContribucionAccionService{
    constructor(
        @Inject(ContribucionAccionRepository)
        private contribucionAccionRepository: ContribucionAccionRepository,
        @Inject('NATS_SERVICE') private client: ClientProxy
    ) {}
    
    async crearContribucionAccion(data: ContribucionAccion): Promise<ContribucionAccion> {
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

        const contribucionCreada = await this.contribucionAccionRepository.create(data);
        if(contribucionCreada){
            console.log('Emitiendo evento de contribución creada');
            this.client.emit(SERVICE.CONTRIBUCION_MODULE, contribucionCreada);
        }
        
        return contribucionCreada;
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
