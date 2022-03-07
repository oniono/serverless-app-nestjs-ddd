import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBarCode1646589105040 implements MigrationInterface {
    name = 'CreateBarCode1646589105040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "efreqbarcode" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "freqBarcodeNo" character varying NOT NULL DEFAULT '0', "userId" character varying NOT NULL, CONSTRAINT "UQ_929103e54788cc848c3c0265d65" UNIQUE ("userId"), CONSTRAINT "PK_865958eecb8f8229386ce56647b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "efreqbarcode"`);
    }

}
