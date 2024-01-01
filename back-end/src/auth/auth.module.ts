import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import JwtConfigService from 'src/jwt_service/jwt_config_service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    })
  ],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
    
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }