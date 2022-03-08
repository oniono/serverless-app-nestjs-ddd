import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEfreqDB1646708570790 implements MigrationInterface {
    name = 'CreateEfreqDB1646708570790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "efreqbarcode" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "freqBarcodeNo" character varying NOT NULL DEFAULT '0', "userId" character varying NOT NULL, CONSTRAINT "UQ_929103e54788cc848c3c0265d65" UNIQUE ("userId"), CONSTRAINT "PK_865958eecb8f8229386ce56647b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "efreqdashboard" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "balance" integer NOT NULL DEFAULT '0', "panCount" integer NOT NULL DEFAULT '0', "missionStickerCount" integer NOT NULL DEFAULT '0', "normalStickerCount" integer NOT NULL DEFAULT '0', "userId" character varying NOT NULL, CONSTRAINT "UQ_f52ab6613d584c0c6b29c487070" UNIQUE ("userId"), CONSTRAINT "PK_78b6c5518d7ae43a9a416fe8e53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "efreqsticker" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "freqDashboardId" character varying NOT NULL, "normalStickerCount" integer NOT NULL, "missionStickerCount" integer NOT NULL, CONSTRAINT "PK_1d72c0739ddbe30b02378e1e766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "efrequser" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "city" character varying NOT NULL, "postalCode" character varying NOT NULL, "street" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_890e82215ceac2c26b6e01c519d" UNIQUE ("email"), CONSTRAINT "PK_803711e08b04063ac41ab0bf4ac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "efrequser"`);
        await queryRunner.query(`DROP TABLE "efreqsticker"`);
        await queryRunner.query(`DROP TABLE "efreqdashboard"`);
        await queryRunner.query(`DROP TABLE "efreqbarcode"`);
    }

}
