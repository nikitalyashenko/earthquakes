import { IsUrl } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ImportEarthquakeInput {
  @Field()
  @IsUrl()
  fileUrl: string;
}
