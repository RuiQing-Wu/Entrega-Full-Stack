import { Module } from '@nestjs/common';
import { ApoyoService } from './apoyo.service';
import { ApoyoController } from './apoyo.controller';
import { IApoyoService } from './interfaces/apoyo.interface';
import { ApoyoRepository } from './repositories/apoyo.repository';
import { ApoyoRepositoryRedis } from './repositories/apoyo.repository.redis';
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
export class ApoyoRegistroModule { }
