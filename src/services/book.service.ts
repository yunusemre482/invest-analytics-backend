import { DeleteResult, Repository } from "typeorm";
import { Book } from "../entity/Book";
import { AppDataSource } from "../data-source";
import { PaginationAndFilter } from "../validations/pagination-and-filter.validation";
import { BorrowedBook } from "../entity/BarrowedBook";
import { BadRequestError, NotFoundError } from "../middlewares/errors";


export class BookService {
    private bookRepository: Repository<Book>;
    private borrowedBookRepository: Repository<BorrowedBook>;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book);
        this.borrowedBookRepository = AppDataSource.getRepository(BorrowedBook);
        console.log("BookService created");
    }

    async findAll(query: PaginationAndFilter): Promise<[Book[], number]> {
        return this.bookRepository.findAndCount({
            take: query.limit,
            skip: query.limit * (query.page - 1),
            order: {
                [query.sort]: query.order
            }
        });
    }

    async findOne(id: number): Promise<Book | undefined> {
        return this.bookRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async create(Book: Book): Promise<Book> {
        return this.bookRepository.save(Book);
    }

    async update(id: number, Book: Book): Promise<Book> {
        const BookToUpdate = await this.bookRepository.findOne({
            where: {
                id: id
            }
        });

        if (!BookToUpdate) {
            throw new NotFoundError('Book not found');
        }

        return this.bookRepository.merge(BookToUpdate, Book);
    }

    async updatePartial(id: number, Book: Partial<Book>): Promise<Book> {
        const BookToUpdate = await this.bookRepository.findOne({
            where: {
                id: id
            }
        });

        if (!BookToUpdate) {
            throw new NotFoundError('Book not found');
        }

        return this.bookRepository.merge(BookToUpdate, Book);
    }


    async delete(id: string): Promise<DeleteResult | null> {
        return await this.bookRepository.delete(id);
    }

    async borrowBook(userId: number, bookId: number): Promise<BorrowedBook | null> {

        // create borrowed book record with userID and bookID
        const borrowedBook = this.borrowedBookRepository.create({
            userId: userId,
            bookId: bookId,
            borrowedAt: new Date(),
            returnedAt: null
        });

        return await this.borrowedBookRepository.save(borrowedBook);

    }

    async returnBook(userId: number, bookId: number): Promise<BorrowedBook> {

        const borrowedBook = await this.borrowedBookRepository.findOne({
            where: {
                userId: userId,
                bookId: bookId,
                returnedAt: null
            }
        });

        if (!borrowedBook) {
            throw new BadRequestError('Book not borrowed');
        }

        borrowedBook.returnedAt = new Date();

        return await this.borrowedBookRepository.save(borrowedBook);
    }

    async isBookAvailable(bookId: number): Promise<boolean> {
        const borrowedBook = await this.borrowedBookRepository.findOne({
            where: {
                book: {
                    id: bookId
                },
                returnedAt: null
            }
        });

        return !borrowedBook;
    }


}

