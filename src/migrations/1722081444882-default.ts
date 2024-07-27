import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1722081444882 implements MigrationInterface {
    name = 'Default1722081444882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "averageRating" numeric(3,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borrowed_books" ("id" SERIAL NOT NULL, "borrowedAt" TIMESTAMP NOT NULL DEFAULT now(), "returnedAt" TIMESTAMP, "rating" integer, "userId" integer, "bookId" integer, CONSTRAINT "PK_01047184a37de804d08725858ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrowed_books" ADD CONSTRAINT "FK_408f82dab16da2fa7631a61e8f6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrowed_books" ADD CONSTRAINT "FK_6ee8aef29eec0a9aac3b5e288c3" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrowed_books" DROP CONSTRAINT "FK_6ee8aef29eec0a9aac3b5e288c3"`);
        await queryRunner.query(`ALTER TABLE "borrowed_books" DROP CONSTRAINT "FK_408f82dab16da2fa7631a61e8f6"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "borrowed_books"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
