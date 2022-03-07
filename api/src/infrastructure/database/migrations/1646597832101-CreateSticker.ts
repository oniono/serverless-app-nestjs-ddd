import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSticker1646597832101 implements MigrationInterface {
    name = 'CreateSticker1646597832101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "efreqsticker" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "freqDashboardId" character varying NOT NULL, "normalStickerCount" integer NOT NULL, "missionStickerCount" integer NOT NULL, CONSTRAINT "PK_1d72c0739ddbe30b02378e1e766" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "efreqsticker"`);
    }

}
