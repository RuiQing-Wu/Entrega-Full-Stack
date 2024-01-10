import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoRegistroService } from './apoyo-registro.service';

describe('ApoyoRegistroService', () => {
  let service: ApoyoRegistroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApoyoRegistroService],
    }).compile();

    service = module.get<ApoyoRegistroService>(ApoyoRegistroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
