import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ParseIntPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { RolesEnum } from 'src/user/const/roles.const';
import { User } from 'src/user/decorator/user.decorator';
import { PaginatePostDto } from './dto/paginate-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(@Query() query: PaginatePostDto) {
    return this.postService.getPosts(query);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  @Auth([RolesEnum.USER, RolesEnum.ADMIN])
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @User('id') userId: number,
  ) {
    return this.postService.createPost(createPostDto, userId);
  }

  @Patch(':id')
  @Auth([RolesEnum.USER, RolesEnum.ADMIN])
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
    @User('id') userId: number,
  ) {
    return this.postService.updatePost(id, createPostDto, userId);
  }

  @Delete(':id')
  @Auth([RolesEnum.USER, RolesEnum.ADMIN])
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.postService.deletePost(id, userId);
  }
}
