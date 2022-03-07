import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDashboard1646589656489 implements MigrationInterface {
    name = 'CreateDashboard1646589656489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "efreqdashboard" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "balance" integer NOT NULL DEFAULT '0', "panCount" integer NOT NULL DEFAULT '0', "missionStickerCount" integer NOT NULL DEFAULT '0', "normalStickerCount" integer NOT NULL DEFAULT '0', "userId" character varying NOT NULL, CONSTRAINT "UQ_f52ab6613d584c0c6b29c487070" UNIQUE ("userId"), CONSTRAINT "PK_78b6c5518d7ae43a9a416fe8e53" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "efreqdashboard"`);
    }

}
