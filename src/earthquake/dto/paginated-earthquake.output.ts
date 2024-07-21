import { Field, ObjectType } from 'type-graphql';
import { Earthquake } from '../entities/earthquake.entity';
import { PaginationMeta } from '../../graphql/dto/pagination-meta.output';

@ObjectType()
export class PaginatedEarthquakeOutput {
  @Field(() => [Earthquake])
  items: Earthquake[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
