import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { BorrowedBook } from './BarrowedBook';
import { BookRating } from './BookRating';

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('decimal', { precision: 3, scale: 2, default: 0.00 })
    averageRating: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.book)
    borrowedBooks: BorrowedBook[];

    @OneToMany(() => BookRating, bookRating => bookRating.book)
    bookRatings: BookRating[];
}