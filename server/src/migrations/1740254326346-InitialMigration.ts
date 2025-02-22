import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1740254326346 implements MigrationInterface {
    name = 'InitialMigration1740254326346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "licensePlate" character varying NOT NULL, "manufacturer" character varying NOT NULL, "model" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79a273823977d25c7523162cd5a" UNIQUE ("licensePlate"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
