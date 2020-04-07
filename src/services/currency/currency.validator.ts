import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CurrencyService } from './currency.service';

@ValidatorConstraint({ name: 'isManagedCurrency', async: true })
@Injectable()
export class IsManagedCurrencyConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly currencyService: CurrencyService) {}

  validate(value: string): boolean {
    return Object.keys(this.currencyService.getAll()).includes(value);
  }

  defaultMessage(): string {
    return 'Currency is not valid.';
  }
}

// tslint:disable-next-line: typedef
export const IsManagedCurrency = (validationOptions?: ValidationOptions) => (
  object: object,
  propertyName: string,
): void => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    validator: IsManagedCurrencyConstraint,
    options: validationOptions,
  });
};
