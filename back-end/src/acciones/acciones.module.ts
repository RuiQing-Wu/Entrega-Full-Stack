import { Module } from '@nestjs/common';
import { AccionesServiceImpl } from './acciones.service';
import { AccionesController } from './acciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccionSolidaria } from './domain/accion_solidaria.domain';
import { AccionSchema } from './schemas/accion.schema';
import { IAccionService } from './interfaces/accion.service.interface';
import { AccionesRepository } from './repositories/acciones.repository';
import { AccionesRepositoryMongo } from './repositories/acciones.repository.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccionSolidaria.name, schema: AccionSchema },
    ]),
  ],

  controllers: [AccionesController],
  providers: [
    {
      provide: IAccionService,
      useClass: AccionesServiceImpl,
    },
    {
      provide: AccionesRepository,
      useClass: AccionesRepositoryMongo,
    },
  ],

  exports: [IAccionService, AccionesRepository],
})
export class AccionesModule {}
