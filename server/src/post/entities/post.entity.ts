import { IsString } from 'class-validator';
import { BaseModel } from 'src/common/entities/base.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Post extends BaseModel {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  featuredImage: string;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
