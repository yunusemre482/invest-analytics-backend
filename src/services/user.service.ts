import { DeleteResult, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { PaginationAndFilter } from "../validations/pagination-and-filter.validation";
import { NotFoundError } from "../middlewares/errors";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);

        console.log("UserService created");
    }

    async findAll(query: PaginationAndFilter): Promise<[User[],number]> {
        return this.userRepository.findAndCount({
            take: query.limit,
            skip: query.limit * (query.page - 1),
            order: {
                [query.sort]: query.order
            }
        });
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async update(id: number, user: User): Promise<User> {
        const userToUpdate = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userToUpdate) {
            throw new NotFoundError('User not found');
        }

        return this.userRepository.merge(userToUpdate, user);
    }

    async updatePartial(id: number, user: Partial<User>): Promise<User> {
        const userToUpdate = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userToUpdate) {
            throw new NotFoundError('User not found');
        }

        return this.userRepository.merge(userToUpdate, user);
    }


    async delete(id: string): Promise<DeleteResult | null> {
        return await this.userRepository.delete(id);
    }



}