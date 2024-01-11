import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-yet';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class AppService {

  private redisStore: RedisStore;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, 
  //private readonly neo4jService: Neo4jService
  ) {
    this.redisStore = this.cacheManager.store as RedisStore;
  }
  
  async getHello(): Promise<string> {
    // GET REDIS CONNECTION FROM CACHE MANAGER
    const redisClient = this.redisStore.client;
    // SET KEY VALUE PAIR AND EXPIRE TIME
    await redisClient.set('foo', 'bar', { EX: 10 });

    // await redisClient.quit();

    /* this.neo4jService.read('MATCH (movie:Movie) RETURN movie LIMIT 1').then((result) => {
      console.log(result.records[0].get('movie').properties);
    }); */

    return 'Hello World!';
  }
}
