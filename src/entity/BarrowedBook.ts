import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity({
    name: 'borrowed_books'
})
export class BorrowedBook {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(() => User, user => user.borrowedBooks)
    user: User;

    @ManyToOne(() => Book, book => book.borrowedBooks)
    book: Book;

    @CreateDateColumn()
    borrowedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnedAt: Date;

    @Column({ type: 'int', nullable: true })
    rating: number;
}