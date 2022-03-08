import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMySQL1646719296723 implements MigrationInterface {
    name = 'CreateMySQL1646719296723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `efrequser` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `postalCode` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `role` enum ('admin', 'operator', 'user') NOT NULL DEFAULT 'user', UNIQUE INDEX `IDX_890e82215ceac2c26b6e01c519` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_890e82215ceac2c26b6e01c519` ON `efrequser`");
        await queryRunner.query("DROP TABLE `efrequser`");
    }

}
