import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: './.env' });
const config = {
    type: 'postgres',
    host: `db`,
    port: `5432`,
    username: `postgres`,
    password: `postgres`,
    database: `postgres`,
    entities: [ `**/*.entity.ts,.js`],
    migrations: ["migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
}


export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);