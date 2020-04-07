import { IsMongoId, IsString } from 'class-validator';

export class FindOneProductParams {
  @IsString()
  @IsMongoId()
  productId: string;
}
