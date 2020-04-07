import { Injectable, Logger } from '@nestjs/common';
import * as request from 'request-promise-native';
import { CURRENCY_API_URL } from './currency.constants';
import { Currencies } from './types/currencies.type';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserModule } from '../../api/user/user.module';

@Injectable()
export class CurrencyService {
  private readonly logger: Logger = new Logger(CurrencyService.name);
  private baseCurrency: string;
  private currencies: Currencies;

  @Cron(CronExpression.EVERY_HOUR)
  async load(): Promise<void> {
    const data: any = await request.get(CURRENCY_API_URL, { json: true });

    if (!data || !data.rates) {
      throw new Error('Cannot load currency rates!');
    }

    this.baseCurrency = data.base;
    this.currencies = data.rates;

    this.logger.log(
      `Loaded ${Object.keys(this.currencies).length} currencies.`,
    );
  }

  getAll(): Currencies {
    return this.currencies;
  }

  getValue(currency: string): number {
    return this.currencies[currency];
  }

  recalculateValue(
    value: number,
    oldCurrency: string,
    newCurrency: string,
  ): number {
    return (value / this.getValue(oldCurrency)) * this.getValue(newCurrency);
  }
}
