import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import {
  ENV_JWT_HASH_ROUNDS_KEY,
  ENV_JWT_SECRET_KEY,
} from 'src/common/const/env-keys.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {}

  signToken(user: Pick<User, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  loginUser(user: Pick<User, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  async authenticateWithEmailAndPassword(
    user: Pick<User, 'email' | 'password'>,
  ) {
    const existingUser = await this.usersService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.');
    }

    const passOK = await bcrypt.compare(user.password, existingUser.password);

    if (!passOK) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return existingUser;
  }

  async loginWithEmail(user: Pick<User, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return this.loginUser(existingUser);
  }

  async registerWithEmail(user: RegisterUserDto) {
    const hash = await this.generatePasswordHash(user.password);

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    return this.loginUser(newUser);
  }

  generatePasswordHash(password: string) {
    return bcrypt.hash(
      password,
      parseInt(this.configService.get<string>(ENV_JWT_HASH_ROUNDS_KEY)),
    );
  }

  extractTokenFormHeader(header: string, isBearer: boolean) {
    if (!header) {
      throw new UnauthorizedException('토큰이 존재하지 않습니다.');
    }

    const splitToken = header.split(' ');
    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('올바른 토큰이 아닙니다.');
    }

    return splitToken[1];
  }

  decodeBasicToken(token: string) {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    const [email, password] = decoded.split(':');

    if (!email || !password) {
      throw new UnauthorizedException('올바른 토큰이 아닙니다.');
    }

    return { email, password };
  }

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      });
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
  }

  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.verifyToken(token);

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException('올바른 토큰이 아닙니다.');
    }

    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }

  async updatePassword(userId: number, password: string) {
    const hash = await this.generatePasswordHash(password);
    return this.usersService.updateUserPassword(userId, hash);
  }
}
