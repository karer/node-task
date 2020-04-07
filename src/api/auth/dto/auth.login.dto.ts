import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  userId: string;
}
