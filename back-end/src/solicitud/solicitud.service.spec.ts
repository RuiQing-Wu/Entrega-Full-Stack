import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudServiceImpl } from './solicitud.service';

describe('SolicitudService', () => {
  let service: SolicitudServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudServiceImpl],
    }).compile();

    service = module.get<SolicitudServiceImpl>(SolicitudServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
