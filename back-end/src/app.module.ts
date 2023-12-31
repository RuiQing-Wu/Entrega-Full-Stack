import { Module } from '@nestjs/common';
import { ComunidadModule } from './comunidades/comunidades.module';
//import { AuthModule } from './auth/auth.module';
//import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CacheConfigService from './cache/cache.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? './config/.env'
        : `./config/${process.env.NODE_ENV}.env`,
    }),

    MongooseModule.forRoot(`${process.env.MONGO_URL}`, {
      user: `${process.env.MONGO_USER}`,
      pass: `${process.env.MONGO_PASS}`,
      dbName: `${process.env.MONGO_DBNAME}`,
    }),

    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    
    // ComunidadModule,
    //AuthModule,
    //UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
