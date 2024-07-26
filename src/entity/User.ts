import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { BorrowedBook } from './BarrowedBook';
import { BookRating } from './BookRating';


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.user)
    borrowedBooks: BorrowedBook[];

    @OneToMany(() => BookRating, bookRating => bookRating.user)
    bookRatings: BookRating[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}