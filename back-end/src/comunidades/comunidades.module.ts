import { Module } from '@nestjs/common';
import { ComunidadesServiceImpl } from './comunidades.service';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { ComunidadesController } from './comunidades.controller';
import { ComunidadModel, ComunidadSchema } from './entities/comunidades.model';
import { CausaModel, CausaSchema } from './entities/comunidades.model';
import { AccionModel, AccionSchema } from './entities/comunidades.model';
import { Comunidad } from './domain/comunidades.domain';
import { IGenericRepository } from 'src/base/generic.repository';
import { ComunidadRepositoryMongose } from './repositories/comunidades.repository.mongo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ComunidadModel.name,
        schema: ComunidadSchema,
      },
      {
        name: CausaModel.name,
        schema: CausaSchema,
      },
      {
        name: AccionModel.name,
        schema: AccionSchema,
      },
    ]),
  ],
  controllers: [ComunidadesController],
  providers: [
    {
      provide: IComunidadesService,
      useClass: ComunidadesServiceImpl,
    },
    {
      provide: IGenericRepository<Comunidad>,
      useClass: ComunidadRepositoryMongose,
    },
  ],
})
export class ComunidadModule {}
