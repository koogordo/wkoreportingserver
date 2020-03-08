import {MigrationInterface, QueryRunner} from "typeorm";

export class InitProdMigration1582601722994 implements MigrationInterface {
    name = 'InitProdMigration1582601722994'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `sub_question` (`subQuestionID` int NOT NULL AUTO_INCREMENT, `parentQuestionKey` varchar(150) NOT NULL, `parentVisitVisitID` varchar(150) NOT NULL, `subQuestionQuestionKey` varchar(150) NOT NULL, `subQuestionVisitVisitID` varchar(150) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`subQuestionID`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `visit` (`visitID` varchar(150) NOT NULL, `visitType` varchar(50) NOT NULL, `clientID` varchar(75) NOT NULL, `visitDate` datetime NOT NULL, `visitOs` varchar(75) NOT NULL, `clientFullName` varchar(150) NOT NULL, `familyID` int NOT NULL, `legacyClientID` int NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`visitID`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question` (`questionKey` varchar(150) NOT NULL, `visitVisitID` varchar(150) NOT NULL, `questionAnswer` varchar(2000) NOT NULL, `questionType` varchar(50) NOT NULL, `formIndexJSON` varchar(2000) NOT NULL, `questionJSON` text NOT NULL, `inputJSON` text NOT NULL, `isSubQuestionFlg` tinyint NOT NULL, `hasSubQuestionFlg` tinyint NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`questionKey`, `visitVisitID`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `sub_question` ADD CONSTRAINT `FK_a124345bd315a9d629866d88e86` FOREIGN KEY (`parentQuestionKey`, `parentVisitVisitID`) REFERENCES `question`(`questionKey`,`visitVisitID`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_f17b62d6e7ade7e7d72f6ae29d6` FOREIGN KEY (`visitVisitID`) REFERENCES `visit`(`visitID`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("CREATE VIEW `visit_question` AS SELECT `visit`.`visitID` AS `visitID`, `visit`.`visitType` AS `visitType`, `visit`.`clientID` AS `clientID`, `visit`.`visitDate` AS `visitDate`, `visit`.`visitOs` AS `visitOs`, `visit`.`clientFullName` AS `clientFullName`, `visit`.`legacyClientID` AS `legacyClientID`, `question`.`questionKey` AS `questionKey`, `question`.`questionAnswer` AS `questionAnswer`, `question`.`questionType` AS `questionType`, `question`.`formIndexJSON` AS `formIndexJSON`, `question`.`questionJSON` AS `questionJSON`, `question`.`inputJSON` AS `inputJSON`, `question`.`isSubQuestionFlg` AS `isSubQuestionFlg`, `question`.`hasSubQuestionFlg` AS `hasSubQuestionFlg` FROM `visit` `visit` INNER JOIN `question` `question` ON `visit`.`visitID` = `question`.`visitVisitID`", undefined);
        await queryRunner.query("INSERT INTO `wkohfatracking`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","wkohfatracking","visit_question","SELECT `visit`.`visitID` AS `visitID`, `visit`.`visitType` AS `visitType`, `visit`.`clientID` AS `clientID`, `visit`.`visitDate` AS `visitDate`, `visit`.`visitOs` AS `visitOs`, `visit`.`clientFullName` AS `clientFullName`, `visit`.`legacyClientID` AS `legacyClientID`, `question`.`questionKey` AS `questionKey`, `question`.`questionAnswer` AS `questionAnswer`, `question`.`questionType` AS `questionType`, `question`.`formIndexJSON` AS `formIndexJSON`, `question`.`questionJSON` AS `questionJSON`, `question`.`inputJSON` AS `inputJSON`, `question`.`isSubQuestionFlg` AS `isSubQuestionFlg`, `question`.`hasSubQuestionFlg` AS `hasSubQuestionFlg` FROM `visit` `visit` INNER JOIN `question` `question` ON `visit`.`visitID` = `question`.`visitVisitID`"]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DELETE FROM `wkohfatracking`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["wkohfatracking","visit_question"]);
        await queryRunner.query("DROP VIEW `visit_question`", undefined);
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_f17b62d6e7ade7e7d72f6ae29d6`", undefined);
        await queryRunner.query("ALTER TABLE `sub_question` DROP FOREIGN KEY `FK_a124345bd315a9d629866d88e86`", undefined);
        await queryRunner.query("DROP TABLE `question`", undefined);
        await queryRunner.query("DROP TABLE `visit`", undefined);
        await queryRunner.query("DROP TABLE `sub_question`", undefined);
    }

}
