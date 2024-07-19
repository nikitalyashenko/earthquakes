import { registerEnumType } from 'type-graphql';

export enum EarthquakeMagType {
  ML = 'ML',
  Mb = 'Mb',
  Ms = 'Ms',
}

registerEnumType(EarthquakeMagType, {
  name: 'EarthquakeMagType',
  description: 'The type of magnitude',
});
