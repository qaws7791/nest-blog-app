import { PickType } from '@nestjs/mapped-types';
import { Tag } from '../entities/tag.entity';

export class CreateTagDto extends PickType(Tag, ['name']) {}
