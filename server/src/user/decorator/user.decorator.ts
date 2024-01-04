import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User as UserEntity } from '../entities/user.entity';

export const User = createParamDecorator(
  (data: keyof UserEntity | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserEntity;
    if (!user) throw new InternalServerErrorException('User not found');

    if (data) return user[data];

    return user;
  },
);
