import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comunidad } from "./domain/comunidades.domain";
import { ComunidadSchema } from "./schemas/comunidad.schema";
import { ComunidadesController } from "./comunidades.controller";
import { IComunidadesService } from "./interfaces/comunidades.service.interface";
import { ComunidadesServiceImpl } from "./comunidades.service";
import { ComunidadesRepository } from "./repositories/comunidades.repository";
import { ComunidadesRepositoryMongo } from "./repositories/comunidades.repository.mongo";
import { NatsClientModule } from "src/nats/nats.clients";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comunidad.name, schema: ComunidadSchema }]),
    NatsClientModule,
  ],

  controllers: [ComunidadesController],
  providers: [
    {
      provide: IComunidadesService,
      useClass: ComunidadesServiceImpl,
    },
    {
      provide: ComunidadesRepository,
      useClass: ComunidadesRepositoryMongo,
    },
  ],

  exports: [IComunidadesService, ComunidadesRepository],
})

export class ComunidadModule {}
