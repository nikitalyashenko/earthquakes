import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { EarthquakeResolver } from './earthquake/earthquake.resolver';

export const createSchema = () => {
  return buildSchema({
    resolvers: [EarthquakeResolver],
  });
};
