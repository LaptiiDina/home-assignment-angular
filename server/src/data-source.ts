import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'vehicles_management',
  entities: [path.join(__dirname, '**/*.entity.js')],
  migrations: [path.join(__dirname, 'migrations/*.js')],
  synchronize: false,
  migrationsRun: true,
});

export default AppDataSource;
