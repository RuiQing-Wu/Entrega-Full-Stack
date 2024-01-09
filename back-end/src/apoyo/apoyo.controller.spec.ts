import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoRegistroController } from './apoyo.controller';
import { ApoyoService } from './apoyo.service';

describe('ApoyoController', () => {
  let controller: ApoyoRegistroController;

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
