import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.messge';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.messge';
import { Exclude } from 'class-transformer';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User extends BaseModel {
  @Column({
    unique: true,
    length: 20,
  })
  @IsString({
    message: stringValidationMessage('닉네임'),
  })
  @Length(3, 20, {
    message: lengthValidationMessage('닉네임'),
  })
  nickname: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage('이메일'),
  })
  @IsEmail()
  @Length(3, 20, {
    message: lengthValidationMessage('이메일'),
  })
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage('비밀번호'),
  })
  @Length(8, 20, {
    message: lengthValidationMessage('비밀번호'),
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
