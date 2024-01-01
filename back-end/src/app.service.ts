import { CACHE_MANAGER, CacheTTL } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-yet';

@Injectable()
export class AppService {

  private redisStore: RedisStore;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redisStore = this.cacheManager.store as RedisStore;
  }
  
  async getHello(): Promise<string> {
    // GET REDIS CONNECTION FROM CACHE MANAGER
    const redisClient = this.redisStore.client;
    // SET KEY VALUE PAIR AND EXPIRE TIME
    await redisClient.set('foo', 'bar', { EX: 10 });

    await redisClient.quit();
    return 'Hello World!';
  }
}
