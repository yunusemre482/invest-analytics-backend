import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';


@Entity({
    name: 'borrowed_books'
})
export class BookRating {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(() => User, user => user.bookRatings)
    user: User;

    @ManyToOne(() => Book, book => book.bookRatings)
    book: Book;

    @Column({ type: 'int' })
    rating: number;

    @CreateDateColumn()
    ratedAt: Date;
}