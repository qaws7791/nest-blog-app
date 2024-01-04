import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('비밀번호는 문자열이어야 합니다.');
    }
    if (value.length < 8) {
      throw new BadRequestException('비밀번호는 8자 이상이어야 합니다.');
    }
    if (value.length > 16) {
      throw new BadRequestException('비밀번호는 16자 이하여야 합니다.');
    }
    return value;
  }
}

@Injectable()
export class MaxLengthPipe implements PipeTransform {
  constructor(private readonly length: number) {}

  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('문자열이 아닙니다.');
    }
    if (value.length > this.length) {
      throw new BadRequestException(`${this.length}자 이하로 입력해주세요.`);
    }

    return value;
  }
}

@Injectable()
export class MinLengthPipe implements PipeTransform {
  constructor(private readonly length: number) {}

  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('문자열이 아닙니다.');
    }
    if (value.length < this.length) {
      throw new BadRequestException(`${this.length}자 이상 입력해주세요.`);
    }

    return value;
  }
}
