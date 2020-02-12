import {MigrationInterface, QueryRunner} from "typeorm";

export class JSONInQuestionToText1581107164239 implements MigrationInterface {
    name = 'JSONInQuestionToText1581107164239'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionJSON` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `inputJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `inputJSON` text NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `inputJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `inputJSON` varchar(5000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `questionJSON`", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD `questionJSON` varchar(5000) NOT NULL", undefined);
    }

}
