import { Controller, Post, Body, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { RolesEnum } from 'src/user/const/roles.const';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Auth([RolesEnum.USER, RolesEnum.ADMIN])
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }
}
