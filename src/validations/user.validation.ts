import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";


export const createUserSchema = z.object({
    name: z.string().min(3).max(100),
});


export const updateUserSchema = z.object({
    name: z.string().min(3).max(100).optional(),
});
