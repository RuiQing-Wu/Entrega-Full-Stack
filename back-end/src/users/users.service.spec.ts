import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceImp } from './users.service';

describe('UsersService', () => {
  let service: UsersServiceImp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersServiceImp],
    }).compile();

    service = module.get<UsersServiceImp>(UsersServiceImp);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
