import { Module } from '@nestjs/common';
import { ApoyoService } from './apoyo.service';
import { ApoyoController } from './apoyo.controller';

@Module({
  controllers: [ApoyoController],
  providers: [ApoyoService],
})
export class ApoyoModule {}
