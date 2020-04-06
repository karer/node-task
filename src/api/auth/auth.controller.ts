import { Controller, Post, ForbiddenException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() dto: any) {
    const user: User = await this.authService.validateUser(dto.userId);

    if (!user) {
      throw new ForbiddenException('User does not exist.');
    }

    const accessToken: string = await this.authService.login(user);

    return {
      accessToken,
    };
  }
}
