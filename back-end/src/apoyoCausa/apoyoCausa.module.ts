import { Module } from '@nestjs/common';
import { ApoyoService } from './apoyoCausa.service';
import { ApoyoController } from './apoyoCausa.controller';
import { IApoyoService } from './interfaces/apoyoCausa.interface';
import { ApoyoRepository } from './repositories/apoyoCausa.repository';
import { ApoyoRepositoryRedis } from './repositories/apoyoCausa.repository.redis';
import { CacheModule } from '@nestjs/cache-manager';
import CacheConfigService from 'src/data_base_service/cache.config.service';

@Module({
  imports: [
    CacheModule.registerAsync({  
      useClass: CacheConfigService,   
    }),
  ],
  controllers: [ApoyoController],
  providers: [
    {
      provide: IApoyoService,
      useClass: ApoyoService,
    },
    {
      provide: ApoyoRepository,
      useClass: ApoyoRepositoryRedis,
    },
  ],
  exports: [IApoyoService, ApoyoRepository],
})
export class ApoyoModule { }
