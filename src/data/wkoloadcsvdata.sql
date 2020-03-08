use wkohfatracking;
show global variables like '%local%';
SET local local_infile = true;
LOAD DATA LOCAL INFILE 'C:\\Users\\kgordon\\npm-dev\\wkodbmods\\src\\database\\sqldata\\visit.csv'
INTO TABLE visit
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '\\'
LINES TERMINATED BY "\n"
IGNORE 1 LINES
(visitID, visitType, clientID, visitDate, visitOs, clientFullName, familyID, legacyClientID);

LOAD DATA LOCAL INFILE 'C:\\Users\\kgordon\\npm-dev\\wkodbmods\\src\\database\\sqldata\\question.csv'
INTO TABLE question
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '\\'
LINES TERMINATED BY "\n"
IGNORE 1 LINES
(visitVisitID, questionKey, questionAnswer, formIndexJSON, questionJSON, inputJSON, isSubQuestionFlg, hasSubQuestionFlg);

LOAD DATA LOCAL INFILE 'C:\\Users\\kgordon\\npm-dev\\wkodbmods\\src\\database\\sqldata\\subquestion.csv'
INTO TABLE sub_question
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '\\'
LINES TERMINATED BY "\n"
IGNORE 1 LINES
(parentQuestionKey, parentVisitVisitID, subQuestionQuestionKey, subQuestionVisitVisitID);