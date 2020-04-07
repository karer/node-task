import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { Cart } from './interfaces/cart.interface';
import { User } from '../user/interfaces/user.interface';

const mockUser: User = ({
  id: '1',
} as any) as User;

const mockCarts: Cart[] = ([
  { id: '1', userId: '1', content: [] },
  { id: '2', userId: '1', content: [] },
  { id: '3', userId: '2', content: [] },
] as any) as Cart[];

const mockCartService = {
  async findForUser(user: User) {
    return mockCarts.filter(cart => cart.userId === user.id);
  },

  async findByIdForUser(user: User, id: string) {
    return mockCarts.find(cart => cart.id === id && cart.userId === user.id);
  },
};

const mockProductService = {};

describe('Cart Controller', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user carts', async () => {
    const dto = await controller.getCarts(mockUser);

    expect(dto).toMatchObject({
      carts: expect.any(Array),
    });
    expect(dto.carts).toHaveLength(2);
  });

  it('should get user cart', async () => {
    const dto = await controller.getCart({ id: mockCarts[0].id }, mockUser);

    expect(dto).toMatchObject({
      cart: expect.any(Object),
    });
    expect(dto.cart.content).toBe(mockCarts[0].content);
  });

  it("should not get other user's cart", () => {
    expect(
      controller.getCart({ id: mockCarts[2].id }, mockUser),
    ).rejects.toThrowError();
  });
});
