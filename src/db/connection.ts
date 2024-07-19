import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Load env vars
config();

export const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  logging: false,
};

export default new DataSource(postgresConnectionOptions);
