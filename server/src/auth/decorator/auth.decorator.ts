// import { SetMetadata } from '@nestjs/common';
// import { RolesEnum } from 'src/users/const/roles.const';

import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RolesEnum } from 'src/user/const/roles.const';
import { AccessTokenGuard } from '../guard/bearer-token.guard';
import { RolesGuard } from '../guard/roles.guard';

const SetRoles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);

export const Auth = (roles: RolesEnum[]) => {
  return applyDecorators(
    SetRoles(...roles),
    UseGuards(AccessTokenGuard),
    UseGuards(RolesGuard),
  );
};
