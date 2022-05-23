import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class DatabaseEnvironment {
  @IsString()
  name: string;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsString()
  host: string;

  @IsInt()
  @Type(() => Number)
  port: number;
}
