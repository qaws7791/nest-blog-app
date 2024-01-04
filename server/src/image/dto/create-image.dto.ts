import { PickType } from '@nestjs/mapped-types';
import { Image } from '../entities/image.entity';

export class CreateImageDto extends PickType(Image, ['type', 'path']) {}
