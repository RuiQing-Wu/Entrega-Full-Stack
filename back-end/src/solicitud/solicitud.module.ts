import { Module } from '@nestjs/common';
import { SolicitudServiceImpl } from './solicitud.service';
import { Solicitud } from './domain/solicitud.domain';
import { SolicitudSchema } from './schemas/solicitud.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { SolicitudesRepository } from './repositories/solicitudes.repository';
import { SolicitudesRepositoryMongo } from './repositories/solicitudes.repository.mongo';
import { SolicitudController } from './solicitud.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { NatsClientModule } from 'src/nats/nats.clients';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Solicitud.name, schema: SolicitudSchema },
    ]),
    ScheduleModule.forRoot(),
    NatsClientModule
  ],

  controllers: [SolicitudController],
  providers: [
    {
      provide: ISolicitudesService,
      useClass: SolicitudServiceImpl,
    },
    {
      provide: SolicitudesRepository,
      useClass: SolicitudesRepositoryMongo,
    },
  ],

  exports: [ISolicitudesService, SolicitudesRepository],
})
export class SolicitudModule { }
