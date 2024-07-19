import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';

// Load env vars
config();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  logging: false,
};

export default new DataSource(options);
