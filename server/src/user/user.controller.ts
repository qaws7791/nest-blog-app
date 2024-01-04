import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './decorator/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Patch()
  @Auth([])
  updateUser(
    @Body() updateProfileDto: UpdateProfileDto,
    @User('id') userId: number,
  ) {
    return this.usersService.updateUser(userId, updateProfileDto);
  }

  @Get('me')
  @Auth([])
  getMe(@User('id') userId: number) {
    return this.usersService.getUserById(userId);
  }
}
