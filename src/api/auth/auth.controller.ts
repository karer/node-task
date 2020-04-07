import { Controller, Post, ForbiddenException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/interfaces/user.interface';
import { AuthLoginDto } from './dto/auth.login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'User was authenticated successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'User authentication failed.',
  })
  @Post()
  async login(@Body() dto: AuthLoginDto) {
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
