import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationMeta {
  @Field(() => Number, {
    description: 'the amount of items on this specific page',
  })
  itemCount: number;

  @Field(() => Number, {
    nullable: true,
    description: 'the total amount of items',
  })
  totalItems?: number;

  @Field(() => Number, {
    description: 'the amount of items that were requested per page',
  })
  itemsPerPage: number;

  @Field(() => Number, {
    nullable: true,
    description: 'the total amount of pages in this paginator',
  })
  totalPages?: number;

  @Field(() => Number, {
    description: 'the current page this paginator "points" to',
  })
  currentPage: number;
}
