import { Module } from '@nestjs/common';
import { ComunidadModule } from './comunidades/comunidades.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccionesModule } from './acciones/acciones.module';
import { CausasModule } from './causas/causas.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import CacheConfigService from './data_base_service/cache.config.service';
import MongooseConfigService from './data_base_service/mongo.config.service';
import { ApoyoRegistroModule } from './apoyo-registro/apoyo-registro.module';
import { ApoyoCausaModule } from './apoyo-causa/apoyo-causa.module';
import { SeguidorModule } from './seguidor/seguidor.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ContribucionAccionModule } from './contribucion-accion/contribucion-accion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? './config/.env'
        : `./config/${process.env.NODE_ENV}.env`,
    }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),

    AuthModule,
    UsersModule,
    ComunidadModule,
    CausasModule,
    AccionesModule,
    SolicitudModule,
    ApoyoRegistroModule,
    ApoyoCausaModule,
    SeguidorModule,
    ContribucionAccionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
