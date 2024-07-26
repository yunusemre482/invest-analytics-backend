import "reflect-metadata"
import * as dotenv from "dotenv";

dotenv.config({
    encoding: "utf-8",
    path: [".env", ".env.development", ".env.production", ".env.test", ".env.local", ".env.development.local", ".env.production.local", ".env.test.local"]
});

import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import { errorHandler } from "./middlewares/error.middleware";



const app = express();

// Initialize the the middlewares
app.use(express.json());
app.use(errorHandler);

const { PORT = 3000 } = process.env;


app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));