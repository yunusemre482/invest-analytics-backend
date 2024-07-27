import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { BorrowedBook } from './BarrowedBook';

@Entity({ name: 'books' })
export class Book {
    // NOTE : should use uuid @PrimaryGeneratedColumn("uuid")
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column('decimal', { precision: 3, scale: 2, default: 0.00 })
    averageRating: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.book)
    borrowedBooks: BorrowedBook[];
}