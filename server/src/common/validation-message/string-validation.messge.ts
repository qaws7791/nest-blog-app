import { ValidationArguments } from 'class-validator';

export const stringValidationMessage =
  (name: string) => (args: ValidationArguments) => {
    return `${name}(${args.property})은(는) 문자열로 입력해주세요.`;
  };
