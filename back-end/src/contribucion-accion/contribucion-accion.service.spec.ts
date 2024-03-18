import { Test, TestingModule } from '@nestjs/testing';
import { ContribucionAccionService } from './contribucion-accion.service';

describe('ContribucionAccionService', () => {
  let service: ContribucionAccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContribucionAccionService],
    }).compile();

    service = module.get<ContribucionAccionService>(ContribucionAccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
