import { Field, Float, Int, ArgsType } from 'type-graphql';
import { EarthquakeMagType } from '../enums/earthquake-mag.enum';
import { EarthquakeSource } from '../enums/earthquake-source.enum';

@ArgsType()
export class UpdateEarthquakeInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  dateTime?: Date;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  depth?: number;

  @Field(() => Float, { nullable: true })
  magnitude?: number;

  @Field(() => EarthquakeMagType, { nullable: true })
  magType?: EarthquakeMagType;

  @Field(() => Int, { nullable: true })
  nbStations?: number;

  @Field(() => Int, { nullable: true })
  gap?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field(() => Float, { nullable: true })
  rms?: number;

  @Field(() => EarthquakeSource, { nullable: true })
  source?: EarthquakeSource;

  @Field(() => String, { nullable: true })
  eventId?: string;
}
