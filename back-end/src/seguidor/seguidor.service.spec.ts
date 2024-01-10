import { Test, TestingModule } from '@nestjs/testing';
import { SeguidorService } from './seguidor.service';

describe('SeguidorService', () => {
  let service: SeguidorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguidorService],
    }).compile();

    service = module.get<SeguidorService>(SeguidorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
