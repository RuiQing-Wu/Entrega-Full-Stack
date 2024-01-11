import { Module } from '@nestjs/common';
import { SeguidorServiceImpl } from './seguidor.service';
import { SeguidorController } from './seguidor.controller';
import { ISeguidorService } from './interfaces/seguidor.service.interface';
import { SeguidorRepository } from './repositories/seguidor.repository';
import { SeguidorRepositoryNeo4j } from './repositories/seguidor.repository.neo4j';

@Module({
  controllers: [SeguidorController],
  providers: [
    {
      provide: ISeguidorService,
      useClass: SeguidorServiceImpl
    },
    {
      provide: SeguidorRepository,
      useClass: SeguidorRepositoryNeo4j
    }
  ],
  exports: [ISeguidorService, SeguidorRepository]
})

export class SeguidorModule {}
