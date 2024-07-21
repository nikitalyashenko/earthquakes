import { registerEnumType } from 'type-graphql';

export enum EarthquakeMagType {
  MB = 'Mb',
  MC = 'Mc',
  MD = 'Md',
  ME = 'Me',
  ML = 'ML',
  MS = 'Ms',
  MW = 'Mw',
  UNK = 'Unk',
}

registerEnumType(EarthquakeMagType, {
  name: 'EarthquakeMagType',
  description: 'The type of magnitude',
});
