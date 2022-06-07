import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class Slice<T> {
  @Exclude() private readonly _sliceSize: number;
  @Exclude() private readonly _hasMoreItems: boolean;
  @Exclude() private readonly _items: T[];

  constructor(sliceSize: number, items: T[]) {
    this._sliceSize = sliceSize;
    this._hasMoreItems = items.length > sliceSize;
    this._items = items.slice(0, sliceSize);
  }

  @ApiProperty()
  @Expose()
  get sliceSize(): number {
    return this._sliceSize;
  }

  @ApiProperty()
  @Expose()
  get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  @ApiProperty()
  @Expose()
  get items(): T[] {
    return this._items;
  }
}
