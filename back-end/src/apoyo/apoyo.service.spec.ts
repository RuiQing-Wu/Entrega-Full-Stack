import { Test, TestingModule } from '@nestjs/testing';
import { ApoyoService } from './apoyo.service';

describe('ApoyoService', () => {
  let service: ApoyoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApoyoService],
    }).compile();

    service = module.get<ApoyoService>(ApoyoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
