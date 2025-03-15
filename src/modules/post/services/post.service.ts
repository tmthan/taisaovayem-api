import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities';
import { Repository } from 'typeorm';
import { AppRequest, PaginationResponse } from 'src/shared/types';
import { AddPostRequestDto } from '../dtos';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/modules/auth/entities';
import { PostStatus } from '../types';
import { UserRole } from 'src/modules/auth/types';
import { createError, generateSlug } from 'src/shared/helpers';
import slugify from 'slugify';

@Injectable({
  scope: Scope.REQUEST,
})
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(REQUEST)
    private readonly request: AppRequest,
  ) {}

  async getPostList(): Promise<PaginationResponse<Post>> {
    const [postList, total] = await this.postRepository.findAndCount();
    return {
      items: postList,
      total,
    };
  }

  async addPost(data: AddPostRequestDto) {
    const author = await this.userRepository.findOneBy({
      id: this.request.userId,
    });
    if (!author) {
      throw new UnauthorizedException();
    }
    const postData: Partial<Post> = {
      ...data,
      author,
    };
    const slug = slugify(data.name, {
      lower: true,
    });
    const existSlug = await this.postRepository.findOneBy({ slug });
    if (!existSlug) {
      postData.slug = slug;
    } else {
      postData.slug = slug + '-' + generateSlug();
    }
    if (![UserRole.Admin, UserRole.Writer].includes(this.request.role)) {
      if (!data.status) {
        postData.status = PostStatus.Pending;
      }
      if (data.status && data.status !== PostStatus.Draft) {
        throw createError({
          error: 'not_permission',
          message: 'Bạn không có quyền thực hiện hành động này',
          status: 403,
        });
      }
    }
    const result = await this.postRepository.save(postData);
    return result;
  }
}
