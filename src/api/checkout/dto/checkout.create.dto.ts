import { IsString } from 'class-validator';
import { IsManagedCurrency } from '../../../services/currency/currency.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiProperty()
  @IsString()
  @IsManagedCurrency()
  currency: string;
}
