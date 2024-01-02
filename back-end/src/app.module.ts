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
    
    AuthModule,
    UsersModule,
    ComunidadModule,
    CausasModule,
    AccionesModule,
    SolicitudModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
