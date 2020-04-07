import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/interfaces/user.interface';
import { ForbiddenException } from '@nestjs/common';

const mockUsers: { [key: string]: User } = {
  '1': { id: '1', email: '' },
};

const mockAuthService = {
  validateUser(id: string) {
    return mockUsers[id];
  },

  login(user: User) {
    return `token-for-${user.id}`;
  },
};

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login existing user', async () => {
    expect(await controller.login({ userId: '1' })).toMatchObject({
      accessToken: expect.any(String),
    });
  });

  it('should not login unexisting user', async () => {
    expect(controller.login({ userId: '2' })).rejects.toThrowError(
      ForbiddenException,
    );
  });
});
