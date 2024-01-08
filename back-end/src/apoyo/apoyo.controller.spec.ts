import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoController } from './apoyo.controller';
import { ApoyoService } from './apoyo.service';

describe('ApoyoController', () => {
  let controller: ApoyoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApoyoController],
      providers: [ApoyoService],
    }).compile();

    controller = module.get<ApoyoController>(ApoyoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
