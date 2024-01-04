import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/user/entities/user.entity';

export class RegisterUserDto extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {}
