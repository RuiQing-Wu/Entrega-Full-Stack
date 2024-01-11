import { Test, TestingModule } from '@nestjs/testing';
import { SeguidorServiceImpl } from './seguidor.service';

describe('SeguidorService', () => {
  let service: SeguidorServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguidorServiceImpl],
    }).compile();

    service = module.get<SeguidorServiceImpl>(SeguidorServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
