import { IsMongoId, IsString } from 'class-validator';

export class FindOneParams {
  @IsString()
  @IsMongoId()
  id: string;
}
