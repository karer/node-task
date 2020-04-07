import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/interfaces/cart.interface';
import { User } from '../user/interfaces/user.interface';

const mockUser: User = ({ id: '1' } as any) as User;

const mockCarts: Cart[] = ([
  { id: '1', userId: '1', content: [] },
  { id: '2', userId: '2', content: [] },
] as any) as Cart[];

const mockCheckoutService = {
  checkout(cart: Cart, currency: string) {
    return {
      price: {
        amount: 100,
        currency,
      },
    };
  },
};

const mockCartService = {
  async findByIdForUser(user: User, id: string) {
    return mockCarts.find(cart => cart.id === id && cart.userId === user.id);
  },
};

describe('Checkout Controller', () => {
  let controller: CheckoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        { provide: CheckoutService, useValue: mockCheckoutService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create checkout for available cart', async () => {
    const dto = await controller.createCheckout(
      { cartId: mockCarts[0].id },
      { currency: 'usd' },
      mockUser,
    );

    expect(dto).toMatchObject({
      checkout: {
        price: {
          amount: 100,
          currency: 'usd',
        },
      },
    });
  });

  it('should not create checkout for unavailable cart', async () => {
    expect(
      controller.createCheckout(
        { cartId: mockCarts[1].id },
        { currency: 'usd' },
        mockUser,
      ),
    ).rejects.toThrowError();
  });
});
