import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({ status: 200, description: 'Retrieved all products.' })
  @Get()
  async getProducts() {
    const products = await this.productService.find({});

    return { products };
  }
}
