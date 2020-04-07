import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneProductParams {
  @ApiProperty()
  @IsString()
  @IsMongoId()
  productId: string;
}
