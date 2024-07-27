import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { BorrowedBook } from './BarrowedBook';


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.user)
    borrowedBooks: BorrowedBook[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}