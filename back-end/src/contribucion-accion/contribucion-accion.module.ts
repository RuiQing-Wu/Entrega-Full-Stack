import { Module } from '@nestjs/common';
import { ContribucionAccionService } from './contribucion-accion.service';
import { IContribucionAccionService } from './interfaces/contribucion-accion.service.interface';
import { ContribucionAccionRepository } from './repositories/contribucion-accion.repository';
import { ContribucionAccionRepositoryMongo } from './repositories/contribucion-accion.repository.mongo';
import { ContribucionAccionResolver } from './contribucion-accion.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ContribucionSchema } from './schemas/contribucion-accion.schema';
import { ContribucionAccion } from './domain/contribucion-accion.domain';
import { ContribucionAccionController } from './contribucion-accion.controler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ContribucionAccion.name, schema: ContribucionSchema }]),
  ],
  providers: [
    {
      provide: IContribucionAccionService,
      useClass: ContribucionAccionService,
    },
    {
      provide: ContribucionAccionRepository,
      useClass: ContribucionAccionRepositoryMongo,
    },
    ContribucionAccionResolver
  ],
  controllers: [ContribucionAccionController],
  exports: [IContribucionAccionService, ContribucionAccionRepository],
})
export class ContribucionAccionModule {}
