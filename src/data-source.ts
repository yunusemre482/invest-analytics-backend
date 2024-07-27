
import * as dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config({
    path: ['.env.development.local', '.env.development', '.env']
});

import { DataSource } from "typeorm";
import { User } from './entity/User';
import { Book } from './entity/Book';
import { BorrowedBook } from './entity/BarrowedBook';


const { NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;


export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT ?? "5432"),
    username: POSTGRES_USER ?? "test",
    password: POSTGRES_PASSWORD ?? "test",
    database: POSTGRES_DB ?? "test",
    synchronize: NODE_ENV === "development",
    logging: NODE_ENV === "development",
    entities: [User, Book, BorrowedBook],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
    subscribers: [],
})

