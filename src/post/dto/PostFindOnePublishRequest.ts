import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PostFindOnePublishRequest {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
