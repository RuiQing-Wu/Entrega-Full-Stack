import { Module } from '@nestjs/common';
import { CausasServiceImpl } from './causas.service';
import { CausasController } from './causas.controller';
import { CausaSolidaria } from './domain/causa_solidaria.domain';
import { MongooseModule } from '@nestjs/mongoose';
import { CausaSchema } from './schemas/causa.schema';
import { ICausasService } from './interfaces/causas.service.interface';
import { CausasRepository } from './repositories/causas.repository';
import { CausasRepositoryMongo } from './repositories/causas.repository.mongo';
import { NatsClientModule } from 'src/nats/nats.clients';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CausaSolidaria.name, schema: CausaSchema }]),
    NatsClientModule
  ],
  controllers: [CausasController],
  providers: [
    {
      provide: ICausasService,
      useClass: CausasServiceImpl
    },
    {
      provide: CausasRepository,
      useClass: CausasRepositoryMongo
    }
  ],

  exports: [ICausasService, CausasRepository]
})

export class CausasModule {}
