import { IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  currency: string;
}
