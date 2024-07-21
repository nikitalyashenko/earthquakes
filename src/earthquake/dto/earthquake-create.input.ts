import { Field, Float, Int, ArgsType } from 'type-graphql';
import { EarthquakeMagType } from '../enums/earthquake-mag.enum';
import { EarthquakeSource } from '../enums/earthquake-source.enum';

@ArgsType()
export class CreateEarthquakeInput {
  @Field()
  dateTime: Date;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  depth: number;

  @Field(() => Float)
  magnitude: number;

  @Field(() => EarthquakeMagType)
  magType: EarthquakeMagType;

  @Field(() => Int)
  nbStations: number;

  @Field(() => Int, { nullable: true })
  gap?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field(() => Float, { nullable: true })
  rms?: number;

  @Field(() => EarthquakeSource)
  source: EarthquakeSource;

  @Field(() => String, { nullable: true })
  eventId?: string;
}
