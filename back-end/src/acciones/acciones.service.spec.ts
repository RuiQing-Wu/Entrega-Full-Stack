import { Test, TestingModule } from '@nestjs/testing';
import { AccionesServiceImpl } from './acciones.service';

describe('AccionesService', () => {
  let service: AccionesServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccionesServiceImpl],
    }).compile();

    service = module.get<AccionesServiceImpl>(AccionesServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
