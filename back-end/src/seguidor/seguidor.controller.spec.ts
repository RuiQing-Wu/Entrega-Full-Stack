import { Test, TestingModule } from '@nestjs/testing';
import { SeguidorController } from './seguidor.controller';
import { SeguidorService } from './seguidor.service';

describe('SeguidorController', () => {
  let controller: SeguidorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguidorController],
      providers: [SeguidorService],
    }).compile();

    controller = module.get<SeguidorController>(SeguidorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
