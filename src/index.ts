import "reflect-metadata"
import * as dotenv from "dotenv";

dotenv.config({
    encoding: "utf-8",
    path: [".env", ".env.development", ".env.production", ".env.test", ".env.local", ".env.development.local", ".env.production.local", ".env.test.local"]
});

import { AppDataSource } from "./data-source";
import * as express from "express";

import UserRoutes from "./routes/user.router";
import BookRoutes from "./routes/book.router";
import errorHandler from "./middlewares/error.middleware";



AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));

const app = express();

// Initialize the the middlewares
app.use(express.json());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));


const { PORT = 3000 } = process.env;

app.use("/users", UserRoutes);
app.use("/books", BookRoutes);

app.use(errorHandler);