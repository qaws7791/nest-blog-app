import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  getTagByName(name: string) {
    return this.tagRepository.findOne({ where: { name } });
  }

  async createTag(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    const existingTag = await this.getTagByName(name);

    if (existingTag) {
      throw new BadRequestException('이미 존재하는 태그입니다.');
    }

    return this.tagRepository.save(createTagDto);
  }

  async findAndCreateTag(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    const existingTag = await this.getTagByName(name);

    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.save(createTagDto);
  }

  convertPostCount(tags) {
    return tags.map((tag) => {
      const { postcount, ...rest } = tag;
      return {
        ...rest,
        postCount: parseInt(postcount, 10),
      };
    });
  }

  async findAll() {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.posts', 'post')
      .select([
        'tag.id AS id',
        'tag.name AS name',
        'COUNT(post.id) AS postCount',
      ])
      .groupBy('tag.id')
      .orderBy('postCount', 'DESC')
      .getRawMany()
      .then((tags) => {
        return this.convertPostCount(tags);
      });

    return tags;
  }
}
