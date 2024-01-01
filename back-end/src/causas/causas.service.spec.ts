import { Test, TestingModule } from '@nestjs/testing';
import { CausasService } from './causas.service';

describe('CausasService', () => {
  let service: CausasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CausasService],
    }).compile();

    service = module.get<CausasService>(CausasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
