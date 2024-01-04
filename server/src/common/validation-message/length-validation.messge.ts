import { ValidationArguments } from 'class-validator';

export const lengthValidationMessage =
  (name: string) => (args: ValidationArguments) => {
    if (args.constraints.length === 1) {
      return `${name}(${args.property})은(는) 최소${args.constraints[0]}자리로 입력해주세요.`;
    } else {
      return `${name}(${args.property})은(는) ${args.constraints[0]}~${args.constraints[1]}자리로 입력해주세요.`;
    }
  };
