import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Earthquake } from '../entities/earthquake.entity';
import { GqlApiError, GqlApiErrorCode } from '../../graphql/gql-api-error';
import { PaginationInput } from '../../graphql/dto/pagination.input';
import { PaginatedEarthquakeOutput } from '../dto/paginated-earthquake.output';
import { paginate } from '../../utils/paginate';

@Service()
export class EarthquakeService {
  constructor(
    @InjectRepository(Earthquake)
    private earthquakeRepo: Repository<Earthquake>,
  ) {}

  public async getById(id: number): Promise<Earthquake> {
    const earthquake = await this.earthquakeRepo.findOne({ where: { id } });

    if (!earthquake) {
      throw new GqlApiError(GqlApiErrorCode.NotFound, 'Earthquake not found');
    }

    return earthquake;
  }

  public async getPaginatedEarthquake(
    paginationInput: PaginationInput,
  ): Promise<PaginatedEarthquakeOutput> {
    return paginate<Earthquake>(this.earthquakeRepo, paginationInput);
  }
}
