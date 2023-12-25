import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./user/entities/user.entity";
import { Session } from "./session/entities/session.entity";
import { Vehicle } from "./vehicle/entities/vehicle.entity";
import { ReportEntry } from "./report/entities/report.entity";

dotenvConfig({ path: './.env' });
const config = {
    type: 'postgres',
    host: `db`,
    port: `5432`,
    username: `postgres`,
    password: `postgres`,
    database: `postgres`,
    entities: [ Session,ReportEntry,User,Vehicle],
    autoLoadEntities: true,
    synchronize: true,
}


export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);