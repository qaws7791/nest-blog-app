import { Column, Entity } from 'typeorm';
import { IsEnum, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseModel } from 'src/common/entities/base.entity';
import { join } from 'path/posix';
import { PUBLIC_IMAGES_FOLDER_PATH } from 'src/common/const/path.const';

export enum ImageType {
  POST = 'POST',
}

@Entity()
export class Image extends BaseModel {
  @Column({
    enum: ImageType,
  })
  @IsEnum(ImageType)
  @IsString()
  type: ImageType;

  @Column()
  @IsString()
  @Transform(({ value }) => {
    `/${join(PUBLIC_IMAGES_FOLDER_PATH, value)}`;
  })
  path: string;
}
