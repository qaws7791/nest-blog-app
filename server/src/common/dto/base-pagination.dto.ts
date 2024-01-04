import { IsNumber, IsOptional, Max } from 'class-validator';

export class BasePaginationDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @Max(100, { message: '최대 100개까지 조회할 수 있습니다.' })
  @IsOptional()
  size?: number = 20;
}
