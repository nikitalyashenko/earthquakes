import 'reflect-metadata';
import fs from 'fs';
import { createConnection, useContainer } from 'typeorm';
import Container from 'typedi';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { printSchema, GraphQLSchema } from 'graphql';

import AppDataSourceOptions from './db/connection';
import { createSchema } from './schema';
import logger from './utils/logger';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

useContainer(Container);

const initializeDataSource = async (): Promise<void> => {
  try {
    await createConnection(AppDataSourceOptions);
    logger.info('Data Source has been initialized!');
  } catch (error) {
    logger.error('Error during data source initialization:', error);
    throw error;
  }
};

const generateSchemaFile = (schema: GraphQLSchema): void => {
  try {
    const sdl = printSchema(schema);
    fs.writeFileSync('src/schema.gql', sdl);
  } catch (error) {
    logger.error('Error writing schema to file:', error);
    throw error;
  }
};

const startApolloServer = async (
  schema: GraphQLSchema,
): Promise<Application> => {
  const server = new ApolloServer({ schema });
  const app = express();

  await server.start();
  server.applyMiddleware({ app });

  return app;
};

const startExpressServer = (app: Application): void => {
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}/graphql`);
  });
};

const bootstrap = async (): Promise<void> => {
  try {
    await initializeDataSource();
    const schema = await createSchema();
    generateSchemaFile(schema);

    const app = await startApolloServer(schema);
    startExpressServer(app);
  } catch (error) {
    logger.error('Error during server initialization:', error);
  }
};

bootstrap();
