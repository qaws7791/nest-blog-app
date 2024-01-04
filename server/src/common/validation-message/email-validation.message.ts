import { ValidationArguments } from 'class-validator';

export const emailValidationMessage =
  (name: string) => (args: ValidationArguments) => {
    return `${name}(${args.property})은(는) 이메일 형식으로 입력해주세요.`;
  };
