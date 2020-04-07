import { IsString } from 'class-validator';
import { IsManagedCurrency } from '../../../services/currency/currency.validator';

export class CreateCheckoutDto {
  @IsString()
  @IsManagedCurrency()
  currency: string;
}
