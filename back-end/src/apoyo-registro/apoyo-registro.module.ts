import { Module } from '@nestjs/common';
import { ApoyoRegistroController } from './apoyo-registro.controller';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';
import { ApoyoRegistroSchema } from './schemas/apoyo-registro.schema';
import { ApoyoRegistro } from './domain/apoyo-registro.damain';
import { MongooseModule } from '@nestjs/mongoose';
import { ApoyoRegistroServiceImpl } from './apoyo-registro.service';
import { ApoyoRegistroRepository } from './repositories/apoyo-registro.repository';
import { ApoyoRegistroRepositoryMongo } from './repositories/apoyo-registro.repository.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApoyoRegistro.name, schema: ApoyoRegistroSchema }]),
  ],

  controllers: [ApoyoRegistroController],

  providers: [
    {
      provide: IApoyoRegistroService,
      useClass: ApoyoRegistroServiceImpl
    },
    {
      provide: ApoyoRegistroRepository,
      useClass: ApoyoRegistroRepositoryMongo
    }
  ],

  exports: [IApoyoRegistroService, ApoyoRegistroRepository]
})

export class ApoyoRegistroModule {}
