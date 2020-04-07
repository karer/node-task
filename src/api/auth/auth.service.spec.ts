import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';

const mockUsers: { [key: string]: User } = {
  '1': { id: '1', email: '' },
};

const mockJwtService = {
  async signAsync() {
    return 'jwt';
  },
};

const mockUserService = {
  findById(id: string) {
    return mockUsers[id];
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate exiting user', () => {
    expect(service.validateUser('1')).toMatchObject(mockUsers['1']);
  });

  it('should validate unexisting user', () => {
    expect(service.validateUser('2')).toBeUndefined();
  });

  it('should login user', async () => {
    const user = service.validateUser('1');

    expect(typeof (await service.login(user))).toBe('string');
  });
});
