import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class EarthquakeCsvRowOutput {
  @Field()
  dateTime: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  depth: string;

  @Field()
  magnitude: string;

  @Field()
  magType: string;

  @Field({ nullable: true })
  nbStations?: string;

  @Field({ nullable: true })
  gap?: string;

  @Field({ nullable: true })
  distance?: string;

  @Field({ nullable: true })
  rms?: string;

  @Field()
  source: string;

  @Field({ nullable: true })
  eventID: string;

  @Field(() => [String], { nullable: true })
  propertyError?: string[];
}
