import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Earthquake } from '../entities/earthquake.entity';

import { GqlApiError, GqlApiErrorCode } from '../../graphql/gql-api-error';
import { PaginationInput } from '../../graphql/dto/pagination.input';

import { PaginatedEarthquakeOutput } from '../dto/paginated-earthquake.output';
import { CreateEarthquakeInput } from '../dto/earthquake-create.input';
import { UpdateEarthquakeInput } from '../dto/earthquake-update.input';

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

  public async createEarthquake(
    createEarthquakeInput: CreateEarthquakeInput,
  ): Promise<Earthquake> {
    const earthquake = this.earthquakeRepo.create(createEarthquakeInput);
    return this.earthquakeRepo.save(earthquake);
  }

  public async updateEarthquake(
    updateEarthquakeInput: UpdateEarthquakeInput,
  ): Promise<Earthquake> {
    const earthquake = await this.getById(updateEarthquakeInput.id);

    Object.assign(earthquake, updateEarthquakeInput);
    return this.earthquakeRepo.save(earthquake);
  }

  public async deleteEarthquake(id: number): Promise<boolean> {
    const { affected } = await this.earthquakeRepo.delete({ id });

    if (!affected) {
      throw new GqlApiError(GqlApiErrorCode.NotFound, 'Earthquake not found');
    }

    return true;
  }
}
