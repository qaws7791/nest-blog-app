import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesEnum } from './user/const/roles.const';
import { Auth } from './auth/decorator/auth.decorator';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('any')
  getAny() {
    return 'any';
  }

  @Get('signed')
  @Auth([])
  getUser() {
    return 'signed';
  }

  @Get('admin')
  @Auth([RolesEnum.ADMIN])
  getAdmin() {
    return 'admin';
  }
}
