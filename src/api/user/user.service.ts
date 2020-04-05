import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { USER_MOCKS } from './user.constants';

@Injectable()
export class UserService {
  findById(id: string): User {
    return USER_MOCKS[id];
  }
}
