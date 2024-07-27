# Library Management Application For Invest Analytics Task

## Overview

This is a library management application designed to manage members and the borrowing of books by members. The application allows for various operations including listing users, accessing user information, creating new users, listing books, accessing book information, creating new books, borrowing books, and returning books with ratings. 

## Features

- **User Management**
  - List all users
  - Access information about a specific user (name, books borrowed in the past with their user scores, and currently borrowed books)
  - Create a new user
- **Book Management**
  - List all books
  - Access information about a specific book (name and average rating)
  - Create a new book
- **Borrowing and Returning Books**
  - Borrow a book
  - Return a book and provide a rating

## Technical Requirements

- **Code Versioning**: Git
- **Environment**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: zod
- **Error Handling**: Comprehensive error handling for operations like borrowing a book by a non-existing user or borrowing a book already borrowed by someone else

## Technologies Used

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- **TypeORM**: An ORM that can run in Node.js and is written in TypeScript
- **PostgreSQL**: A powerful, open source object-relational database system
- **zod**: A set of express.js middlewares that wraps zod validator and sanitizer functions

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yunusemre482/invest-analytics-backend.git
    ```

2. **Install dependencies**
    ```bash
    cd invest-analytics-backend
    npm install
    ```

3. **Configure the database**
   - Create a PostgreSQL database
   - Update the `ormconfig.json` file with your database connection details
    ```json
    {
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "your-username",
      "password": "your-password",
      "database": "library_management",
      "synchronize": true,
      "logging": false,
      "entities": [
         "src/entity/**/*.ts"
      ],
      "migrations": [
         "src/migration/**/*.ts"
      ],
      "subscribers": [
         "src/subscriber/**/*.ts"
      ]
    }
    ```

4. **Run the application**
    ```bash
    npm run start:dev
    ```

## API Endpoints

The application follows the RESTful API principles. Below are the main endpoints available:

- **Users**
  - `GET /users` - List all users
  - `GET /users/:id` - Access information about a specific user
  - `POST /users` - Create a new user

- **Books**
  - `GET /books` - List all books
  - `GET /books/:id` - Access information about a specific book
  - `POST /books` - Create a new book

- **Borrowing and Returning Books**
  - `POST /users/:id/borrow/:bookId` - Borrow a book
  - `POST /users/:id/return/:bookId` - Return a book and give a rating

## Database Schema

Data Definition Language (DDL) script for creating the necessary tables in PostgreSQL.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  average_rating FLOAT DEFAULT 0
);

CREATE TABLE borrowed_books (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  book_id INT REFERENCES books(id),
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  returned_at TIMESTAMP,
  rating INT CHECK (rating >= 0 AND rating <= 5)
);