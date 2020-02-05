import {MigrationInterface, QueryRunner} from "typeorm";

export class changeJsonToVarcharInQuestion1580224572613 implements MigrationInterface {
    name = 'changeJsonToVarcharInQuestion1580224572613'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionAnswer`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionAnswer` varchar(2000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionType`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionType` varchar(50) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `formIndexJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `formIndexJSON` varchar(2000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionJSON` varchar(5000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `inputJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `inputJSON` varchar(5000) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `inputJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `inputJSON` json NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionJSON` json NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `formIndexJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `formIndexJSON` json NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionType`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionType` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionAnswer`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionAnswer` text NOT NULL", undefined);
    }

}
