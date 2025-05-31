import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
}

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
})