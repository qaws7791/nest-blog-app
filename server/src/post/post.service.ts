import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly commonService: CommonService,
    private readonly tagService: TagService,
  ) {}

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'tags'],
    });
    // delete createdAt, updatedAt of tags
    // post.tags = post.tags.map((tag) => {
    //   delete tag.createdAt;
    //   delete tag.updatedAt;
    //   return tag;
    // });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return post;
  }

  async createPost(createPostDto: CreatePostDto, userId: number) {
    const { tags, ...postDto } = createPostDto;

    try {
      const post = this.postRepository.create({
        ...postDto,
        author: {
          id: userId,
        },
      });

      const newTags = [];
      for (const tagName of tags) {
        const tag = await this.tagService.findAndCreateTag({ name: tagName });
        newTags.push(tag);
      }
      post.tags = newTags;
      await this.postRepository.save(post);
      return post;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('게시글 생성에 실패했습니다.');
    }
  }

  getPosts(dto: PaginatePostDto) {
    let where: FindOptionsWhere<Post> | FindOptionsWhere<Post>[] = {};

    if (dto.tag) {
      where = { tags: { name: dto.tag } };
    } else if (dto.title) {
      where = { title: Like(`%${dto.title}%`) };
    }

    return this.commonService.pagePaginate(dto, this.postRepository, {
      relations: ['author'],
      where: where,
      order: { createdAt: 'DESC' },
      select: ['id', 'title', 'description', 'featuredImage', 'createdAt'],
    });
  }

  async updatePost(id: number, dto: CreatePostDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('게시글을 수정할 권한이 없습니다.');
    }
    const { tags, ...postDto } = dto;
    const newTags = [];
    for (const tagName of tags) {
      const tag = await this.tagService.findAndCreateTag({ name: tagName });
      newTags.push(tag);
    }
    post.tags = newTags;
    post.title = postDto.title;
    post.content = postDto.content;
    post.description = postDto.description;
    post.featuredImage = postDto.featuredImage;
    await this.postRepository.save(post);
    return post;
  }

  async deletePost(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('게시글을 삭제할 권한이 없습니다.');
    }
    await this.postRepository.delete(id);

    return {
      message: '게시글을 삭제했습니다.',
      statusCode: 200,
      id: id,
    };
  }

  findPostByTagName(tagName: string) {
    return this.postRepository.find({
      relations: ['tags'],
      where: { tags: { name: tagName } },
    });
  }
}
