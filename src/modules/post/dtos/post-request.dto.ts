import {
  //   IsArray,
  //   IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostStatus } from '../types';

export class AddPostRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  //   @IsEmpty()
  //   @IsArray()
  //   tags: string[];

  @IsOptional()
  @IsString()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
