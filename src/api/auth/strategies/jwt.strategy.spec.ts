import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/interfaces/user.interface';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

const mockUsers: { [key: string]: User } = {
  '1': { id: '1', email: '' },
};

const mockConfigService = {
  get() {
    return 'config';
  },
};

const mockUserService = {
  findById(id: string) {
    return mockUsers[id];
  },
};

describe('Jwt Strategy', () => {
  let service: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate exiting user', async () => {
    expect(await service.validate({ userId: '1' })).toMatchObject(
      mockUsers['1'],
    );
  });

  it('should validate unexisting user', async () => {
    expect(await service.validate({ userId: '2' })).toBeUndefined();
  });
});
