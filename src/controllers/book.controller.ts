import { NextFunction, Request, Response } from "express";
import { parseFilterAndPagination } from "../validations/pagination-and-filter.validation";
import { BookService } from "../services/book.service";

export class BookController {
    private bookService: BookService;

    constructor(bookService: BookService = new BookService()) {
        this.bookService = bookService;
    }

    findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { page, limit, filter, sort, order } = parseFilterAndPagination(req);
            const [users, count] = await this.bookService.findAll({ page, limit, filter, sort, order });
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        try {
            const Book = await this.bookService.findOne(userId);
            if (Book) {
                res.status(200).json(Book);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser = await this.bookService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        try {
            const updatedUser = await this.bookService.update(userId, req.body);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    updatePartial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        try {
            const updatedUser = await this.bookService.updatePartial(userId, req.body);

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.bookService.delete(req.params.id);
            if (result.affected) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            next(error);
        }
    }

}