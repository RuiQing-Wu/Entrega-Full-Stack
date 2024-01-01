import { CacheModuleOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import { Injectable } from "@nestjs/common";
import { redisStore } from 'cache-manager-redis-yet';
@Injectable()
class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions {
        return {
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            // to int process.env.REDIS_TTL
            ttl: Number(process.env.REDIS_TTL),
        };
    }
}

export default CacheConfigService;
