import { IsString, IsNumber, Min } from 'class-validator';

export class AddCartProductDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
