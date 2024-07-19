import { registerEnumType } from 'type-graphql';

export enum EarthquakeSource {
  NEI = 'NEI',
  AK = 'AK',
}

registerEnumType(EarthquakeSource, {
  name: 'EarthquakeSource',
  description: 'The source of earthquake data',
});
