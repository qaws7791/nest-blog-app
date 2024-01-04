import {
  Body,
  Controller,
  Headers,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { Auth } from './decorator/auth.decorator';
import { User } from 'src/user/decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Headers('authorization') authorization: string) {
    const token = this.authService.extractTokenFormHeader(authorization, true);

    const newAccessToken = this.authService.rotateToken(token, false);

    return {
      accessToken: newAccessToken,
    };
  }

  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers('authorization') authorization: string) {
    const token = this.authService.extractTokenFormHeader(authorization, true);

    const newRefreshToken = this.authService.rotateToken(token, true);

    return {
      refreshToken: newRefreshToken,
    };
  }

  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  loginEmail(@Headers('authorization') authorization: string) {
    const token = this.authService.extractTokenFormHeader(authorization, false);
    const credentials = this.authService.decodeBasicToken(token);
    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  registerEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }

  @Patch('password/email')
  @Auth([])
  updatePasswordOfEmail(
    @Body('password') password: string,
    @User('id') userId: number,
  ) {
    return this.authService.updatePassword(userId, password);
  }
}
