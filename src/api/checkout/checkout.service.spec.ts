import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/interfaces/cart.interface';

const mockCart: Cart = {} as any;

const mockCartService = {
  getTotalPrice() {
    return 200;
  },
};

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        { provide: CartService, useValue: mockCartService },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create checkout', () => {
    expect(service.checkout(mockCart, 'usd')).toMatchObject({
      price: {
        amount: 200,
        currency: 'usd',
      },
    });
  });
});
