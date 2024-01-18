import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-yet';
import { ApoyoCausaRepository } from './apoyo-causa.repository';
import { ApoyoCausa } from '../domain/apoyo-causa.domain';
import e from 'express';
import { RepositoryError } from 'src/base/repositoryError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@Injectable()
export class ApoyoCausaRepositoryRedis implements ApoyoCausaRepository {
  private redisStore: RedisStore;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redisStore = this.cacheManager.store as RedisStore;
  }

  private toApoyoCausadDomain(idCausa: string, numApoyo: number): ApoyoCausa {
    let apoyoCausa = new ApoyoCausa({ idCausa, numApoyo });
    return apoyoCausa;
  }

  async create(item: ApoyoCausa): Promise<ApoyoCausa> {

    try {
      const redisClient = this.redisStore.client;
      const key = process.env.REDIS_CAUSA_KEY_PREFIX + item.idCausa;
      const resultado = await redisClient.SET(key, 0);
      const newApoyoCausa = new ApoyoCausa({
        ...item,
        numApoyo: 0,
      });

      return newApoyoCausa;
    } catch (error) {
      throw new RepositoryError('Error al crear el apoyo');
    }
  }

  async get(id: string): Promise<ApoyoCausa> {
    try {
      const redisClient = this.redisStore.client;
      const key = process.env.REDIS_CAUSA_KEY_PREFIX + id;
      const resultado = await redisClient.GET(key);

      if (resultado === null) {
        throw new EntityNotFoundError('Apoyo no encontrado con id ' + id);
      }

      return this.toApoyoCausadDomain(id, parseInt(resultado));
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }

      throw new RepositoryError('Error al obtener el apoyo ' + id);
    }
  }

  async getAll(): Promise<ApoyoCausa[]> {
    try {
      const redisClient = this.redisStore.client;
      const keys = await redisClient.KEYS(process.env.REDIS_CAUSA_KEY_PATTERN);

      const lista = [];

      await Promise.all(
        keys.map(async (element) => {
          let resultado = await redisClient.GET(element);
          let idCausa = element.replace(process.env.REDIS_CAUSA_KEY_PREFIX, '');

          lista.push(this.toApoyoCausadDomain(idCausa, parseInt(resultado)));
        }),
      );

      return lista;
    } catch (error) {
      throw new RepositoryError('Error al obtener los apoyos');
    }
  }

  async update(id: string, item: ApoyoCausa): Promise<ApoyoCausa> {
    try {
      const redisClient = this.redisStore.client;
      const key = process.env.REDIS_CAUSA_KEY_PREFIX + id;
      const resultado = await redisClient.SET(key, item.numApoyo);

      return this.toApoyoCausadDomain(id, item.numApoyo);
    } catch (error) {
      throw new RepositoryError('Error al actualizar el apoyo ' + id);
    }
  }

  async delete(id: string): Promise<ApoyoCausa> {
    const resultado = await this.get(id);

    try {
      const redisClient = this.redisStore.client;
      await redisClient.DEL(process.env.REDIS_CAUSA_KEY_PREFIX + id);

      return resultado;
    } catch (error) {
      throw new RepositoryError('Error al eliminar el apoyo ' + id);
    }
  }

  async apoyar(id: string): Promise<ApoyoCausa> {
    try {
      const redisClient = this.redisStore.client;
      const key = process.env.REDIS_CAUSA_KEY_PREFIX + id;
      const resultado = await redisClient.INCR(key);

      return this.toApoyoCausadDomain(id, resultado);
    } catch (error) {
      throw new RepositoryError('Error al apoyar la causa ' + id);
    }
  }
}
