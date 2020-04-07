import { IsMongoId, IsString } from 'class-validator';

export class FindOneCartParams {
  @IsString()
  @IsMongoId()
  cartId: string;
}
