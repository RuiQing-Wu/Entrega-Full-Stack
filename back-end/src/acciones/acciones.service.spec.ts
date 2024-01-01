import { Test, TestingModule } from '@nestjs/testing';
import { AccionesService } from './acciones.service';

describe('AccionesService', () => {
  let service: AccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccionesService],
    }).compile();

    service = module.get<AccionesService>(AccionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
