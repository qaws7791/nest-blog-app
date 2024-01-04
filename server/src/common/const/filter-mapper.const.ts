import {
  Any,
  ArrayContainedBy,
  ArrayContains,
  ArrayOverlap,
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

export const FILTER_MAPPER = {
  any: Any,
  array_contained_by: ArrayContainedBy,
  array_contains: ArrayContains,
  array_over_lap: ArrayOverlap,
  between: Between,
  equal: Equal,
  i_like: ILike,
  in: In,
  is_null: IsNull,
  less_than: LessThan,
  less_than_or_equal: LessThanOrEqual,
  like: Like,
  more_than: MoreThan,
  more_than_or_equal: MoreThanOrEqual,
  not: Not,
};
