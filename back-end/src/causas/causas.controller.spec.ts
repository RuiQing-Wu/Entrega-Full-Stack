import { Test, TestingModule } from '@nestjs/testing';
import { CausasController } from './causas.controller';
import { CausasServiceImpl } from './causas.service';

describe('CausasController', () => {
  let controller: CausasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausasController],
      providers: [CausasServiceImpl],
    }).compile();

    controller = module.get<CausasController>(CausasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
