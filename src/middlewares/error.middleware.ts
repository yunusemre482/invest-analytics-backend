import { NextFunction, Request, response, Response } from "express";
import { ApiError } from "./errors";
import { ZodError } from "zod";

export const errorMiddleware = (
    error: Error & Partial<ApiError> & Partial<ZodError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error';

    return res.status(statusCode).json({ message });
}