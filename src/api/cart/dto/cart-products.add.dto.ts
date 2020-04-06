import { IsString, IsNumber } from 'class-validator';

export class AddCartProductDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
