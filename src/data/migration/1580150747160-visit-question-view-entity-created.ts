import {MigrationInterface, QueryRunner} from "typeorm";

export class visitQuestionViewEntityCreated1580150747160 implements MigrationInterface {
    name = 'visitQuestionViewEntityCreated1580150747160'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE VIEW `visit_question` AS SELECT `visit`.`visitID` AS `visitID`, `visit`.`visitType` AS `visitType`, `visit`.`clientID` AS `clientID`, `visit`.`visitDate` AS `visitDate`, `visit`.`visitOs` AS `visitOs`, `visit`.`clientFullName` AS `clientFullName`, `question`.`questionKey` AS `questionKey`, `question`.`questionAnswer` AS `questionAnswer`, `question`.`questionType` AS `questionType`, `question`.`formIndexJSON` AS `formIndexJSON`, `question`.`questionJSON` AS `questionJSON`, `question`.`inputJSON` AS `inputJSON`, `question`.`isSubQuestionFlg` AS `isSubQuestionFlg`, `question`.`hasSubQuestionFlg` AS `hasSubQuestionFlg` FROM `visit` `visit` INNER JOIN `question` `question` ON `visit`.`visitID` = `question`.`visitVisitID`", undefined);
        await queryRunner.query("INSERT INTO `wkohfatracking`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","wkohfatracking","visit_question","SELECT `visit`.`visitID` AS `visitID`, `visit`.`visitType` AS `visitType`, `visit`.`clientID` AS `clientID`, `visit`.`visitDate` AS `visitDate`, `visit`.`visitOs` AS `visitOs`, `visit`.`clientFullName` AS `clientFullName`, `question`.`questionKey` AS `questionKey`, `question`.`questionAnswer` AS `questionAnswer`, `question`.`questionType` AS `questionType`, `question`.`formIndexJSON` AS `formIndexJSON`, `question`.`questionJSON` AS `questionJSON`, `question`.`inputJSON` AS `inputJSON`, `question`.`isSubQuestionFlg` AS `isSubQuestionFlg`, `question`.`hasSubQuestionFlg` AS `hasSubQuestionFlg` FROM `visit` `visit` INNER JOIN `question` `question` ON `visit`.`visitID` = `question`.`visitVisitID`"]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DELETE FROM `wkohfatracking`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["wkohfatracking","visit_question"]);
        await queryRunner.query("DROP VIEW `visit_question`", undefined);
    }

}
