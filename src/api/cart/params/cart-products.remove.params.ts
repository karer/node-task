import { FindOneParams } from '../../../services/database/database.params';
import { IsMongoId, IsString } from 'class-validator';

export class RemoveCartProductsParams extends FindOneParams {
  @IsString()
  @IsMongoId()
  productId: string;
}
