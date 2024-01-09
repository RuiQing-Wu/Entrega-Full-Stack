import { Module } from '@nestjs/common';
import { ApoyoRegistroController } from './apoyo.controller';
import { ApoyoRegistro } from './domain/apoyo.damain';
import { ApoyoRegistroSchema } from './schemas/apoyo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IApoyoRegistroService } from './interfaces/apoyo.service.interface';
import { ApoyoRegistroRepositoryMongo } from './repositories/apoyos.repository.mongo';
import { ApoyoRegistroRepository } from './repositories/apoyos.reposiroty';
import { RegistroApoyoServiceImpl } from './apoyo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApoyoRegistro.name, schema: ApoyoRegistroSchema }]),
  ],

  controllers: [ApoyoRegistroController],

  providers: [
    {
      provide: IApoyoRegistroService,
      useClass: RegistroApoyoServiceImpl
    },
    {
      provide: ApoyoRegistroRepository,
      useClass: ApoyoRegistroRepositoryMongo
    }
  ],

  exports: [IApoyoRegistroService, ApoyoRegistroRepository]
})
export class ApoyoRegistroModule { }
