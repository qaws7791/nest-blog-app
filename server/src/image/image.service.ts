import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { promises } from 'fs';
import { join } from 'path/posix';
import { PUBLIC_IMAGES_FOLDER_PATH } from 'src/common/const/path.const';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  getRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository(Image) : this.imageRepository;
  }

  async createImage(dto: CreateImageDto, qr?: QueryRunner) {
    const repo = this.getRepository(qr);

    const filePath = join(PUBLIC_IMAGES_FOLDER_PATH, dto.path);

    try {
      await promises.access(filePath);
    } catch (e) {
      throw new BadRequestException('이미지 파일이 존재하지 않습니다.');
    }

    const result = await repo.save({
      ...dto,
    });

    return result;
  }
}
