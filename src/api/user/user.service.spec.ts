import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { USER_MOCKS } from './user.constants';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find existing user', () => {
    expect(service.findById('1')).toBe(USER_MOCKS['1']);
  });

  it('should not find unexisting user', () => {
    expect(service.findById('100')).toBeUndefined();
  });
});
