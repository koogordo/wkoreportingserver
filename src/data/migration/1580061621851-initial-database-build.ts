import {MigrationInterface, QueryRunner} from "typeorm";

export class initialDatabaseBuild1580061621851 implements MigrationInterface {
    name = 'initialDatabaseBuild1580061621851'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `sub_question` (`subQuestionID` int NOT NULL AUTO_INCREMENT, `parentQuestionKey` varchar(150) NOT NULL, `parentVisitVisitID` varchar(150) NOT NULL, `subQuestionQuestionKey` varchar(150) NOT NULL, `subQuestionVisitVisitID` varchar(150) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`subQuestionID`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `visit` (`visitID` varchar(150) NOT NULL, `visitType` varchar(50) NOT NULL, `clientID` varchar(75) NOT NULL, `visitDate` datetime NOT NULL, `visitOs` varchar(75) NOT NULL, `clientFullName` varchar(150) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`visitID`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question` (`questionKey` varchar(150) NOT NULL, `visitVisitID` varchar(150) NOT NULL, `questionAnswer` text NOT NULL, `questionType` text NOT NULL, `formIndexJSON` json NOT NULL, `questionJSON` json NOT NULL, `inputJSON` json NOT NULL, `isSubQuestionFlg` tinyint NOT NULL, `hasSubQuestionFlg` tinyint NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`questionKey`, `visitVisitID`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `sub_question` ADD CONSTRAINT `FK_a124345bd315a9d629866d88e86` FOREIGN KEY (`parentQuestionKey`, `parentVisitVisitID`) REFERENCES `question`(`questionKey`,`visitVisitID`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_f17b62d6e7ade7e7d72f6ae29d6` FOREIGN KEY (`visitVisitID`) REFERENCES `visit`(`visitID`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_f17b62d6e7ade7e7d72f6ae29d6`", undefined);
        await queryRunner.query("ALTER TABLE `sub_question` DROP FOREIGN KEY `FK_a124345bd315a9d629866d88e86`", undefined);
        await queryRunner.query("DROP TABLE `question`", undefined);
        await queryRunner.query("DROP TABLE `visit`", undefined);
        await queryRunner.query("DROP TABLE `sub_question`", undefined);
    }

}
