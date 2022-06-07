import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export abstract class SliceRequest {
  private static DEFAULT_SLICE_SIZE = 10;

  @ApiProperty({ required: true, example: SliceRequest.DEFAULT_SLICE_SIZE })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sliceSize: number = SliceRequest.DEFAULT_SLICE_SIZE;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  lastId?: number;

  /**
   * Query 에서 사용할 limit
   */
  get limit(): number {
    if (!this.sliceSize) {
      return SliceRequest.DEFAULT_SLICE_SIZE;
    }

    return this.sliceSize + 1;
  }
}
