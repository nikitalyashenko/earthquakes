import { registerEnumType } from 'type-graphql';

// Defently it's should be in deferent table with more data
// about source to validate data.
export enum EarthquakeSource {
  AK = 'AK',
  CI = 'CI',
  HV = 'HV',
  NC = 'NC',
  NN = 'NN',
  US = 'us',
  UU = 'UU',
  UW = 'UW',
  WY = 'WY',
  AEI = 'AEI',
  ATH = 'ATH',
  CAS = 'CAS',
  DOE = 'DOE',
  GUC = 'GUC',
  ISK = 'ISK',
  JMA = 'JMA',
  MDD = 'MDD',
  NEI = 'NEI',
  PGC = 'PGC',
  REN = 'REN',
  ROM = 'ROM',
  SJA = 'SJA',
  UCR = 'UCR',
  UNM = 'UNM',
  WEL = 'WEL',
}

registerEnumType(EarthquakeSource, {
  name: 'EarthquakeSource',
  description: 'The source of earthquake data',
});
