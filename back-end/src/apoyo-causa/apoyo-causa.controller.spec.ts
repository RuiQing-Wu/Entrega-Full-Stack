import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoCausaController } from './apoyo-causa.controller';
import { ApoyoCausaService } from './apoyo-causa.service';

describe('ApoyoCausaController', () => {
  let controller: ApoyoCausaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApoyoCausaController],
      providers: [ApoyoCausaService],
    }).compile();

    controller = module.get<ApoyoCausaController>(ApoyoCausaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
