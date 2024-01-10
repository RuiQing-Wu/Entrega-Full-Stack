import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoCausaService } from './apoyo-causa.service';

describe('ApoyoCausaService', () => {
  let service: ApoyoCausaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApoyoCausaService],
    }).compile();

    service = module.get<ApoyoCausaService>(ApoyoCausaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
