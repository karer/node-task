import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneCartParams {
  @ApiProperty()
  @IsString()
  @IsMongoId()
  cartId: string;
}
