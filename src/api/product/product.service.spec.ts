import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';

const mockProductModel = {
  find() {
    return {
      async exec() {
        return [{}, {}, {}];
      },
    };
  },

  findOne() {
    return {
      async exec() {
        return {};
      },
    };
  },

  findById() {
    return {
      async exec() {
        return {};
      },
    };
  },
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getModelToken('Product'), useValue: mockProductModel },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get products', async () => {
    expect(await service.find()).toHaveLength(3);
  });

  it('should get product', async () => {
    expect(typeof (await service.findOne())).toBe('object');
  });

  it('should get product by id', async () => {
    expect(typeof (await service.findById('x'))).toBe('object');
  });
});
