import { Module } from '@nestjs/common';
import { ApoyoCausaServiceImpl } from './apoyo-causa.service';
import { ApoyoCausaController } from './apoyo-causa.controller';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';
import { ApoyoCausaRepository } from './repositories/apoyo-causa.repository';
import { ApoyoCausaRepositoryRedis } from './repositories/apoyo-causa.repository.redis';
import { CacheModule } from '@nestjs/cache-manager';
import CacheConfigService from 'src/data_base_service/cache.config.service';

@Module({
  controllers: [ApoyoCausaController],
  providers: [{
    provide: IApoyoCausaService,
    useClass: ApoyoCausaServiceImpl,
  },
  {
    provide: ApoyoCausaRepository,
    useClass: ApoyoCausaRepositoryRedis,
  },
  ],
  exports: [IApoyoCausaService, ApoyoCausaRepository],
})

export class ApoyoCausaModule { }
