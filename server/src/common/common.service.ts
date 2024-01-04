import { Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseModel } from './entities/base.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {
    const findOptions = this.composeFindOptions<T>(dto);

    const [results, count] = await repository.findAndCount({
      ...findOptions,
      ...overrideFindOptions,
    });

    return {
      results,
      currentPage: dto.page,
      totalPages: Math.ceil(count / dto.size),
      totalItems: count,
      itemsPerPage: dto.size,
    };
  }

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    return {
      skip: (dto.page - 1) * dto.size,
      take: dto.size,
    };
  }
}
