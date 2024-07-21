import { Resolver, Query, Args, Mutation } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { EarthquakeService } from './services/earthquake.service';
import { EarthquakeImportService } from './services/earthquake-import.service';

import { Earthquake } from './entities/earthquake.entity';
import { PaginationInput } from '../graphql/dto/pagination.input';

import { GetEarthquakeInput } from './dto/earthquake-get.input';
import { PaginatedEarthquakeOutput } from './dto/paginated-earthquake.output';
import { CreateEarthquakeInput } from './dto/earthquake-create.input';
import { UpdateEarthquakeInput } from './dto/earthquake-update.input';
import { ImportEarthquakesOutput } from './dto/earthquake-import.output';
import { ImportEarthquakeInput } from './dto/earthquake-import.input';

@Service()
@Resolver(() => Earthquake)
export class EarthquakeResolver {
  constructor(
    @Inject(() => EarthquakeService)
    private readonly earthquakeService: EarthquakeService,
    @Inject(() => EarthquakeImportService)
    private readonly earthquakeImportService: EarthquakeImportService,
  ) {}

  @Query(() => Earthquake)
  async getEarthquake(@Args() { id }: GetEarthquakeInput): Promise<Earthquake> {
    return this.earthquakeService.getById(id);
  }

  @Query(() => PaginatedEarthquakeOutput)
  async getPaginatedEarthquakes(
    @Args() paginationInput: PaginationInput,
  ): Promise<PaginatedEarthquakeOutput> {
    return this.earthquakeService.getPaginatedEarthquake(paginationInput);
  }

  @Mutation(() => Earthquake)
  async createEarthquake(
    @Args() createEarthquakeInput: CreateEarthquakeInput,
  ): Promise<Earthquake> {
    return this.earthquakeService.createEarthquake(createEarthquakeInput);
  }

  @Mutation(() => Earthquake)
  async updateEarthquake(
    @Args() updateEarthquakeInput: UpdateEarthquakeInput,
  ): Promise<Earthquake> {
    return this.earthquakeService.updateEarthquake(updateEarthquakeInput);
  }

  @Mutation(() => Boolean)
  async deleteEarthquake(@Args() { id }: GetEarthquakeInput): Promise<boolean> {
    return this.earthquakeService.deleteEarthquake(id);
  }

  @Mutation(() => ImportEarthquakesOutput)
  async importEarthquakes(
    @Args() importEarthquakeInput: ImportEarthquakeInput,
  ): Promise<ImportEarthquakesOutput> {
    return this.earthquakeImportService.importEarthquakes(
      importEarthquakeInput,
    );
  }
}
