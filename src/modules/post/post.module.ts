import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Tag } from './entities';
import { User } from '../auth/entities';
import { PostController } from './controllers';
import { PostService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, User, Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
