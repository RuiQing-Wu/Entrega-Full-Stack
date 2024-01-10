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
import { Neo4jModule } from 'nest-neo4j/dist';
import { ApoyoRegistroModule } from './apoyo-registro/apoyo-registro.module';
import { ApoyoCausaModule } from './apoyo-causa/apoyo-causa.module';
import { SeguidorModule } from './seguidor/seguidor.module';

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
      useClass: CacheConfigService,
    }),

    /* Neo4jModule.forRoot({  
        scheme: 'neo4j',
        host: 'localhost',
        port: '7687',
        database: 'neo4j',
        username: 'neo4j',
        password: 'testtest',
    }), */

    AuthModule,
    UsersModule,
    ComunidadModule,
    CausasModule,
    AccionesModule,
    SolicitudModule,
    ApoyoRegistroModule,
    ApoyoCausaModule,
    SeguidorModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
