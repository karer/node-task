import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getModelToken } from '@nestjs/mongoose';
import { CurrencyService } from '../../services/currency/currency.service';
import { Cart } from './interfaces/cart.interface';
import { User } from '../user/interfaces/user.interface';
import { Product } from '../product/interfaces/product.interface';
import { CartEntry } from './interfaces/cart-entry.interface';

const mockUser: User = {
  id: '1',
} as any;

const mockCarts: Cart[] = [
  { _id: '1', userId: '1', content: [] },
  { _id: '2', userId: '1', content: [] },
  { _id: '3', userId: '2', content: [] },
] as any;

const mockProduct: Product = {
  _id: 'item1',
  name: 'sample product',
  price: { amount: 9, currency: 'usd' },
} as any;

const mockNewCart: Cart = {
  _id: 'new',
  content: [],
  save: async () => {
    return this;
  },
  markModified: async () => {
    return;
  },
} as any;

const mockNewCartEntry: CartEntry = {} as any;

const mockCartModel = function(fields): Cart {
  return Object.assign({}, mockNewCart, fields);
};

mockCartModel.find = (conditions: object) => {
  return {
    async exec() {
      return mockCarts.filter(cart => {
        let valid = true;

        for (const [key, value] of Object.entries(conditions)) {
          if (cart[key] !== value) {
            valid = false;
            break;
          }
        }

        return valid;
      });
    },
  };
};

mockCartModel.findOne = (conditions: object) => {
  return {
    async exec() {
      return mockCarts.find(cart => {
        let valid = true;

        for (const [key, value] of Object.entries(conditions)) {
          if (cart[key] !== value) {
            valid = false;
            break;
          }
        }

        return valid;
      });
    },
  };
};

const mockCartEntityModel = function(fields): Cart {
  return Object.assign({}, mockNewCart, fields);
};

const mockCurrencyService = {
  recalculateValue(val, oldCurrency, currency) {
    return currency === 'eur' ? val : val / 1.5;
  },
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: getModelToken('Cart'), useValue: mockCartModel },
        { provide: getModelToken('CartEntry'), useValue: mockCartEntityModel },
        { provide: CurrencyService, useValue: mockCurrencyService },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find carts', async () => {
    expect(await service.find({})).toHaveLength(mockCarts.length);
  });

  it('should find cart', async () => {
    expect(await service.findOne({ userId: '2' })).toBe(mockCarts[2]);
  });

  it('should find cart for user', async () => {
    expect(await service.findForUser(mockUser)).toStrictEqual([
      mockCarts[0],
      mockCarts[1],
    ]);
  });

  it('should find accessible cart by id for user', async () => {
    expect(await service.findByIdForUser(mockUser, mockCarts[1]._id)).toBe(
      mockCarts[1],
    );
  });

  it('should not find unaccessible cart by id for user', async () => {
    expect(
      await service.findByIdForUser(mockUser, mockCarts[2].id),
    ).toBeUndefined();
  });

  it('should create cart', async () => {
    const cart: Cart = await service.create({ userId: 'x' });

    expect(cart).toMatchObject({ _id: 'new', userId: 'x' });
  });

  it('should create cart for user', async () => {
    const cart: Cart = await service.createForUser(mockUser);

    expect(cart).toMatchObject({ _id: 'new', userId: '1' });
  });

  it('should add product to cart', async () => {
    const cart: Cart = { ...mockNewCart } as any;

    expect(cart.content).toHaveLength(0);
    await service.addProduct(cart, mockProduct);
    expect(cart.content).toHaveLength(1);
    await service.addProduct(cart, mockProduct, 2);
    expect(cart.content).toHaveLength(1);
    await service.addProduct(cart, { ...mockProduct, _id: 'new-id' } as any, 2);
    expect(cart.content).toHaveLength(2);
  });

  it('should remove product from cart', async () => {
    const cart: Cart = {
      ...mockNewCart,
      content: [{ product: 'remove-1', quantity: 1 }],
    } as any;

    expect(cart.content).toHaveLength(1);
    await service.removeProductById(cart, 'remove-1');
    expect(cart.content).toHaveLength(0);
  });

  it('should calculate total price', async () => {
    const cart: Cart = {
      ...mockNewCart,
      content: [
        { product: { ...mockProduct }, quantity: 1 },
        { product: { ...mockProduct, _id: 'item2' }, quantity: 2 },
      ],
    } as any;

    expect(service.getTotalPrice(cart, 'eur')).toBe(9 * 1 + 9 * 2);
    expect(service.getTotalPrice(cart, 'usd')).toBe((9 * 1 + 9 * 2) / 1.5);
  });
});
