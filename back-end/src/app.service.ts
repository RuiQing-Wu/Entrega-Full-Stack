import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-yet';

@Injectable()
export class AppService {

  private redisStore: RedisStore;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redisStore = cacheManager.store as RedisStore;
  }
  
  async getHello(): Promise<string> {
    // GET REDIS CONNECTION FROM CACHE MANAGER
    const redisClient = this.redisStore.client;
    // SET KEY VALUE WITH CLIENT
    redisClient.set('keySdddSS', 'value');
    // GET KEY VALUE WITH CLIENT
    const value = await redisClient.get('key');
    // RETURN VALUE AND CLOSE CONNECTION
    redisClient.quit();
    return 'Hello World!';
  }
}
