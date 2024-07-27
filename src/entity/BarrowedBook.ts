import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity({
    name: 'borrowed_books'
})
export class BorrowedBook {
    // @PrimaryGeneratedColumn("uuid")
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    bookId: number;

    @ManyToOne(() => User, user => user.borrowedBooks)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Book, book => book.borrowedBooks)
    @JoinColumn({ name: 'bookId' })
    book: Book;

    @Column({ type: 'timestamp', nullable: true })
    borrowedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnedAt: Date;

    @Column({ type: 'int', nullable: true })
    rating: number;
}