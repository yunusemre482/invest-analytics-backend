import { z } from 'zod';

export const createBookSchema = z.object({
    title: z.string().min(3).max(100),
});

export const updateBookSchema = z.object({
    title: z.string().min(3).max(100).optional(),
});


export const borrowBookSchema = z.object({
    userId: z.number().int(),
    bookId: z.number().int(),
});

export const returnBookSchema = z.object({
    body: z.object({
        rating: z.number().int().min(1).max(5),
    }),
    query: z.object({
        bookId: z.number().int(),
        userId: z.number().int(),
    }),
});