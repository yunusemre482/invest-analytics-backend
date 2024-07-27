import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entity/User";
import { DeleteResult } from "typeorm";
import { parseFilterAndPagination } from "../validations/pagination-and-filter.validation";
import { BookService } from "../services/book.service";

export class UserController {
    private userService: UserService;
    private bookService: BookService;

    constructor(
        userService: UserService = new UserService(),
        bookService: BookService = new BookService()
    ) {
        this.userService = userService;
        this.bookService = bookService
    }

    findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { page, limit, filter, sort, order } = parseFilterAndPagination(req);
            const [users, count] = await this.userService.findAll({ page, limit, filter, sort, order });
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        try {
            const user = await this.userService.findOne(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser = await this.userService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        try {
            const updatedUser = await this.userService.update(userId, req.body);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    updatePartial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        try {
            const updatedUser = await this.userService.updatePartial(userId, req.body);

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.userService.delete(req.params.id);
            if (result.affected) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }


    borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        const bookId = parseInt(req.params.bookId);
        try {
            // STEP 1: check user exist or not 
            const user = await this.userService.findOne(userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            // STEP 2: check book exist or not
            const book = await this.bookService.findOne(bookId);

            if (!book) {
                res.status(404).json({ message: "Book not found" });
                return;
            }

            // STEP 3: check book is available or not
            const isAvailable = await this.bookService.isBookAvailable(bookId);

            if (!isAvailable) {
                res.status(400).json({ message: "Book is not available" });
                return;
            }

            // STEP 4: borrow book
            const borrowedBook = await this.bookService.borrowBook(userId, bookId);

            if (borrowedBook) {
                res.status(200).json(borrowedBook);
            } else {
                res.status(400).json({ message: "Failed to borrow book" });
            }


        } catch (error) {
            next(error);
        }
    }

    returnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id);
        const bookId = parseInt(req.params.bookId);
        try {
            const user = await this.userService.findOne(userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const book = await this.bookService.findOne(bookId);

            if (!book) {
                res.status(404).json({ message: "Book not found" });
                return;
            }

            const returedBook = await this.bookService.returnBook(userId, bookId);

            if (returedBook) {
                res.status(200).json({ message: "Book returned successfully", returedBook });
            } else {
                res.status(400).json({ message: "Failed to return book" });
            }

        } catch (error) {
            next(error);
        }
    }

    // getBorrowedBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     const userId = parseInt(req.params.id);
    //     try {
    //         const books = await this.userService.getBorrowedBooks(userId);
    //         res.status(200).json(books);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}