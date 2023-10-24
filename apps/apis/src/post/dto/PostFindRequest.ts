import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { SliceRequest } from '@app/web-common/req/SliceRequest';
import { ApiProperty } from '@nestjs/swagger';

export class PostFindRequest extends SliceRequest {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  override lastId?: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags: string[] = [];

  @ApiProperty()
  @IsOptional()
  @IsString()
  keyword: string;
}
