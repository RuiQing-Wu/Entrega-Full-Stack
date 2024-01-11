import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceImpl } from './users.service';

describe('UsersService', () => {
  let service: UsersServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersServiceImpl],
    }).compile();

    service = module.get<UsersServiceImpl>(UsersServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
