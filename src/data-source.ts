import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book";
import { BookRating } from "./entity/BookRating";
import { BorrowedBook } from "./entity/BarrowedBook";

const { NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

console.log("NODE_ENV", NODE_ENV)
console.log("POSTGRES_HOST", POSTGRES_HOST)
console.log("POSTGRES_PORT", POSTGRES_PORT)
console.log("POSTGRES_USER", POSTGRES_USER)
console.log("POSTGRES_PASSWORD", POSTGRES_PASSWORD);
console.log("POSTGRES_DB", POSTGRES_DB);


export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT ?? "5432"),
    username: POSTGRES_USER ?? "test",
    password: POSTGRES_PASSWORD ?? "test",
    database: POSTGRES_DB ?? "test",
    synchronize: NODE_ENV === "development",
    logging: NODE_ENV === "development",
    entities: [User, Book, BookRating, BorrowedBook],
    migrations: [__dirname + "/migrations/*.ts"],
    subscribers: [],
})
