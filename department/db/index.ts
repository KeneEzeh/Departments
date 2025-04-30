import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

const dirPath = path.join(__dirname, `../../.env`);
dotenv.config({ debug: true, path: dirPath, encoding: 'utf-8' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
  // dropSchema: true,
  // ssl:
  //   process.env.NODE_ENV !== 'development'
  //     ? { rejectUnauthorized: false }
  //     : undefined,

  // ssl: true,
  // extra: {
  ssl: {
    rejectUnauthorized: false,
  },
  // },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
