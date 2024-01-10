import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-yet';
import { ApoyoCausaRepository } from './apoyo-causa.repository';
import { ApoyoCausa } from '../domain/apoyo-causa.domain';

@Injectable()
export class ApoyoCausaRepositoryRedis extends ApoyoCausaRepository{
    private redisStore: RedisStore;
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, 
    ) {
        super();
        this.redisStore = this.cacheManager.store as RedisStore;
    }

    async create(item: ApoyoCausa): Promise<ApoyoCausa> {
        return null;
        throw new Error('Method not implemented.');
        /*const redisClient = this.redisStore.client;
        let entradas = [];
        item.idCausa.forEach(element => {
            entradas.push(element);
            entradas.push(item.apoyo[item.idCausa.indexOf(element)]);
        });
        let check = await redisClient.ZADD(item.idComunidad, entradas);
        if (check == 0){
            throw new Error('Error al crear apoyo');
        }
        return new ApoyoCausa({idComunidad: item.idComunidad, idCausa: item.idCausa, apoyo: item.apoyo});*/
    }
    async get(id: string): Promise<ApoyoCausa> {
        const redisClient = this.redisStore.client;
        let res = await redisClient.ZRANGE(id, 0, -1);
        let puntuacion = [];
        res.forEach(element => async () => {
            puntuacion.push(await redisClient.ZMSCORE(id, element));
        }); 
        return new ApoyoCausa({idComunidad: id, idCausa: res, apoyo: puntuacion});
    }
    async getAll(): Promise<ApoyoCausa[]> {
        const redisClient = this.redisStore.client;
        let total = await redisClient.KEYS('*');
        let ret = [];
        total.forEach(element => async () =>{
            ret.push(await this.get(element));
        });
        return ret;
    }
    update(id: string, item: ApoyoCausa): Promise<ApoyoCausa> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<ApoyoCausa> {
        const redisClient = this.redisStore.client;
        await redisClient.DEL(id);
        return null;
    }
    async getApoyo(comunidadId: string, causaId: string): Promise<number> {
        try {
            const redisClient = this.redisStore.client;
            let res = await redisClient.ZSCORE(comunidadId, causaId);
            if (res === null) {
                return 0;
            }
            return res;
        } catch (error) {
            throw new Error('Error al obtener apoyo');
        }
    }
    async increaseApoyo(comunidadId: string, causaId: string): Promise<number> {
        try {
            const redisClient = this.redisStore.client;
            return await redisClient.ZINCRBY(comunidadId, 1, causaId);
        }
        catch (error) {
            return -1;
        }
    }
    async deleteCausa(comunidadId: string, causaId: string): Promise<void> {
        const redisClient = this.redisStore.client;
        await redisClient.ZREM(comunidadId, causaId);
    }
}
