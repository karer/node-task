import { Controller, Post, Request, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Request() req) {
    const user: User = await this.authService.validateUser(req.userId);

    if (!user) {
      throw new ForbiddenException('User does not exist.');
    }

    const jwt = await this.authService.login(user);

    return {
      accessToken: jwt,
    };
  }
}
