import { Resolver, Query } from 'type-graphql';
import { Earthquake } from './entities/earthquake.entity';

@Resolver()
export class EarthquakeResolver {
  @Query(() => [Earthquake])
  async getEarthquakes() {
    return Earthquake.find();
  }
}
