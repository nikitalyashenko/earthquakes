import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class GetEarthquakeInput {
  @Field(() => Int)
  id: number;
}
