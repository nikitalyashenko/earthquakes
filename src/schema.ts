import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { EarthquakeResolver } from './earthquake/earthquake.resolver';
import Container from 'typedi';

export const createSchema = () => {
  return buildSchema({
    resolvers: [EarthquakeResolver],
    container: Container,
  });
};
