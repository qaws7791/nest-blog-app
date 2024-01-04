import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseModel } from 'src/common/entities/base.entity';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseModel {
  @Column({
    unique: true,
  })
  @IsString()
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
