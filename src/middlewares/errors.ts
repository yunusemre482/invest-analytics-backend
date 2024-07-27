class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = 'BadRequestError') {
        super(message, 400);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = 'UnauthorizedError') {
        super(message, 401);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = 'ForbiddenError') {
        super(message, 403);
    }
}