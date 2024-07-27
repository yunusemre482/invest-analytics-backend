import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";


export const paginateAndFilterSchema = z.object({
    page: z.number().int().min(1).optional(),
    limit: z.number().int().min(1).optional(),
    filter: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
});


export const parseFilterAndPagination = (req: Request) => {
    const { page, limit, filter, sort, order } = req.query;

    return {
        page: page || 1,
        limit: limit || 15,
        filter: filter || '',
        sort: sort || 'createdAt',
        order: order || 'ASC'
    } as PaginationAndFilter;
}


export type PaginationAndFilter = z.infer<typeof paginateAndFilterSchema>;