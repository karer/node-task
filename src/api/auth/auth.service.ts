import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  validateUser(userId: string): User {
    return this.userService.findById(userId);
  }

  async login(user: User): Promise<string> {
    return this.jwtService.signAsync({ userId: user.id });
  }
}
