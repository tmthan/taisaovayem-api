import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SortType } from '../types';
import { Type } from 'class-transformer';

export class BaseListDto {
  @IsOptional()
  @IsString()
  searchText?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortType)
  sortType?: SortType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAtFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAtTo?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAtFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAtTo?: Date;
}
