import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateUserNameDto extends PickType(User, ['password']) {}
