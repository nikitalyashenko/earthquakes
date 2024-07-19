import { Resolver, Query, Args } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { GetEarthquakeInput } from './dto/earthquake-get.input';

import { EarthquakeService } from './services/earthquake.service';
import { Earthquake } from './entities/earthquake.entity';

@Service()
@Resolver(() => Earthquake)
export class EarthquakeResolver {
  constructor(
    @Inject(() => EarthquakeService)
    private earthquakeService: EarthquakeService,
  ) {}

  @Query(() => Earthquake)
  async getEarthquake(@Args() { id }: GetEarthquakeInput): Promise<Earthquake> {
    return this.earthquakeService.getById(id);
  }
}
