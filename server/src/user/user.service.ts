import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(user: Pick<User, 'nickname' | 'email' | 'password'>) {
    const nicknameExists = await this.usersRepository.exist({
      where: {
        nickname: user.nickname,
      },
    });
    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }

    const emailExists = await this.usersRepository.exist({
      where: {
        email: user.email,
      },
    });
    if (emailExists) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const userObject = this.usersRepository.create(user);

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserByNickname(nickname: string) {
    return this.usersRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }
    return user;
  }

  getRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<User>(User) : this.usersRepository;
  }

  async updateUser(userId, dto: UpdateProfileDto, qr?: QueryRunner) {
    const repo = this.getRepository(qr);
    const user = await repo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }

    if (dto.nickname) {
      const nicknameExists = await repo.exist({
        where: {
          nickname: dto.nickname,
        },
      });

      if (nicknameExists) {
        throw new BadRequestException('이미 존재하는 닉네임입니다.');
      }
      user.nickname = dto.nickname;
    }

    return this.usersRepository.save(user);
  }

  async updateUserPassword(userId: number, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }

    user.password = password;

    return await this.usersRepository.save(user);
  }
}
