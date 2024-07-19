import { Repository, ObjectLiteral } from 'typeorm';
import { PaginationInput } from '../graphql/dto/pagination.input';
import { PaginationMeta } from '../graphql/dto/pagination-meta.output';

export async function paginate<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  paginationInput: PaginationInput,
): Promise<{ items: Entity[]; meta: PaginationMeta }> {
  const { page = 1, limit = 10 } = paginationInput;

  const [items, totalItems] = await repository.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalPages = Math.ceil(totalItems / limit);

  const meta: PaginationMeta = {
    itemCount: items.length,
    totalItems,
    itemsPerPage: limit,
    totalPages,
    currentPage: page,
  };

  return { items, meta };
}
