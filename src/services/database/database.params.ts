import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParams {
  @ApiProperty()
  @IsString()
  @IsMongoId()
  id: string;
}
