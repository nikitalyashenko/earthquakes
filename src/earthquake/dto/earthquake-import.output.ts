import { Field, Int, ObjectType } from 'type-graphql';
import { EarthquakeCsvRowOutput } from './earthquake-csv-row.output';

@ObjectType()
export class ImportEarthquakesOutput {
  @Field(() => Int)
  totalImportedCount: number;

  @Field(() => Int)
  failedImportCount: number;

  @Field(() => [EarthquakeCsvRowOutput])
  failedFields: EarthquakeCsvRowOutput[];
}
