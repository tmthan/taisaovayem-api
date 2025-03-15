import { Controller, Get, Post, Injectable, Body } from '@nestjs/common';
import { PostService } from '../services';
import { AddPostRequestDto } from '../dtos';

@Injectable()
@Controller({ path: 'post' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPostList() {
    return this.postService.getPostList();
  }

  @Post()
  addPost(@Body() payload: AddPostRequestDto) {
    return this.postService.addPost(payload);
  }
}
