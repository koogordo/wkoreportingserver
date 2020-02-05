import {MigrationInterface, QueryRunner} from "typeorm";

export class familyidLegacyclientidAddedToVisitEntity1580176811700 implements MigrationInterface {
    name = 'familyidLegacyclientidAddedToVisitEntity1580176811700'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `visit` ADD `familyID` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `visit` ADD `legacyClientID` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `visit` DROP COLUMN `legacyClientID`", undefined);
        await queryRunner.query("ALTER TABLE `visit` DROP COLUMN `familyID`", undefined);
    }

}
