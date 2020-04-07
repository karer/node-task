import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { IsManagedCurrencyConstraint } from './currency.validator';

@Module({
  providers: [CurrencyService, IsManagedCurrencyConstraint],
  exports: [CurrencyService, IsManagedCurrencyConstraint],
})
export class CurrencyModule {}
