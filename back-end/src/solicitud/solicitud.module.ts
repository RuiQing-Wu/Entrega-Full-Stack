import { Module } from '@nestjs/common';
import { SolicitudServiceImpl } from './solicitud.service';
import { Solicitud } from './domain/solicitud.domain';
import { SolicitudSchema } from './schemas/solicitud.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { SolicitudesRepository } from './repositories/solicitudes.repository';
import { SolicitudesRepositoryMongo } from './repositories/solicitudes.repository.mongo';
import { SolicitudController } from './solicitud.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Solicitud.name, schema: SolicitudSchema }]),
  ],

  controllers: [SolicitudController],
  providers: [
    {
      provide: ISolicitudesService,
      useClass: SolicitudServiceImpl
    },
    {
      provide: SolicitudesRepository,
      useClass: SolicitudesRepositoryMongo
    }
  ],

  exports: [ISolicitudesService, SolicitudesRepository],
})

export class SolicitudModule { }
