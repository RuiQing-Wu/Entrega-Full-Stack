import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-yet';
import { ApoyoCausaRepository } from './apoyo-causa.repository';
import { ApoyoCausa } from '../domain/apoyo-causa.domain';

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
    const redisClient = this.redisStore.client;
    const key = process.env.REDIS_CAUSA_KEY_PREFIX + item.idCausa;
    const resultado = await redisClient.SET(key, 0);

    const newApoyoCausa = new ApoyoCausa({
      ...item,
      numApoyo: 0,
    });

    return newApoyoCausa;
  }

  async get(id: string): Promise<ApoyoCausa> {
    const redisClient = this.redisStore.client;

    const key = process.env.REDIS_CAUSA_KEY_PREFIX + id;
    const resultado = await redisClient.GET(key);

    // await redisClient.quit();

    return this.toApoyoCausadDomain(id, parseInt(resultado));
  }

  async getAll(): Promise<ApoyoCausa[]> {
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
  }

  async update(id: string, item: ApoyoCausa): Promise<ApoyoCausa> {
    const redisClient = this.redisStore.client;
    const key = process.env.REDIS_CAUSA_KEY_PREFIX + id;
    const resultado = await redisClient.SET(key, item.numApoyo);

    // await redisClient.quit();

    return this.toApoyoCausadDomain(id, item.numApoyo);
  }

  async delete(id: string): Promise<ApoyoCausa> {
    const redisClient = this.redisStore.client;
    const resultado = await this.get(id);
    await redisClient.DEL(process.env.REDIS_CAUSA_KEY_PREFIX + id);

    // await redisClient.quit();

    return resultado;
  }

  async apoyar(id: string): Promise<ApoyoCausa> {
    const redisClient = this.redisStore.client;
    const key = process.env.REDIS_CAUSA_KEY_PREFIX + id;
    const resultado = await redisClient.INCR(key);

    //await redisClient.quit();
    return this.toApoyoCausadDomain(id, resultado);
  }
}
