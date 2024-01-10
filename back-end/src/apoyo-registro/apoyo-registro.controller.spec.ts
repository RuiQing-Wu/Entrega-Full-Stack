import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoRegistroController } from './apoyo-registro.controller';
import { ApoyoRegistroService } from './apoyo-registro.service';

describe('ApoyoRegistroController', () => {
  let controller: ApoyoRegistroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApoyoRegistroController],
      providers: [ApoyoRegistroService],
    }).compile();

    controller = module.get<ApoyoRegistroController>(ApoyoRegistroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
