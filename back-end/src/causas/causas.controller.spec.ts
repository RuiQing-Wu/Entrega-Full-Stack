import { Test, TestingModule } from '@nestjs/testing';
import { CausasController } from './causas.controller';
import { CausasService } from './causas.service';

describe('CausasController', () => {
  let controller: CausasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausasController],
      providers: [CausasService],
    }).compile();

    controller = module.get<CausasController>(CausasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
