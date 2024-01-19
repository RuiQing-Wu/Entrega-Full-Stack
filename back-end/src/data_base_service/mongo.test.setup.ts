import { config as loadEnvConfig } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import MongooseConfigService from './mongo.config.service';
import { CacheModule } from '@nestjs/cache-manager';
import CacheConfigService from './cache.config.service';
import { AccionesModule } from '../acciones/acciones.module';

let app: INestApplication;

export const setup = async () => {
  try {
    loadEnvConfig({path: './config/.env'}); // Load environment variables

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),

        AccionesModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  } catch (error) {
    console.error('Error during setup:', error);
    throw error;
  }
};

export const teardown = async () => {
  await app.close();
};

export const getApp = () => app;