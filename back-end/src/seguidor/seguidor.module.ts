import { Module } from '@nestjs/common';
import { SeguidorService } from './seguidor.service';
import { SeguidorController } from './seguidor.controller';

@Module({
  controllers: [SeguidorController],
  providers: [SeguidorService],
})
export class SeguidorModule {}
