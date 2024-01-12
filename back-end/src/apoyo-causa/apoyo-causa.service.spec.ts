import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoCausaServiceImpl } from './apoyo-causa.service';

describe('ApoyoCausaService', () => {
  let service: ApoyoCausaServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApoyoCausaServiceImpl],
    }).compile();

    service = module.get<ApoyoCausaServiceImpl>(ApoyoCausaServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
