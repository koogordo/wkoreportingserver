"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Visit_1 = require("./Visit");
var Question_1 = require("./Question");
var VisitQuestion = /** @class */ (function () {
    function VisitQuestion() {
    }
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "visitID", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "visitType", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "clientID", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "visitDate", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "visitOs", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "clientFullName", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "legacyClientID", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "questionKey", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "questionAnswer", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "questionType", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "formIndexJSON", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "questionJSON", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], VisitQuestion.prototype, "inputJSON", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", Boolean)
    ], VisitQuestion.prototype, "isSubQuestionFlg", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", Boolean)
    ], VisitQuestion.prototype, "hasSubQuestionFlg", void 0);
    VisitQuestion = __decorate([
        typeorm_1.ViewEntity({
            expression: function (connection) {
                return connection
                    .createQueryBuilder()
                    .select('visit.visitID', 'visitID')
                    .addSelect('visit.visitType', 'visitType')
                    .addSelect('visit.clientID', 'clientID')
                    .addSelect('visit.visitDate', 'visitDate')
                    .addSelect('visit.visitOs', 'visitOs')
                    .addSelect('visit.clientFullName', 'clientFullName')
                    .addSelect('visit.legacyClientID', 'legacyClientID')
                    .addSelect('question.questionKey', 'questionKey')
                    .addSelect('question.questionAnswer', 'questionAnswer')
                    .addSelect('question.questionType', 'questionType')
                    .addSelect('question.formIndexJSON', 'formIndexJSON')
                    .addSelect('question.questionJSON', 'questionJSON')
                    .addSelect('question.inputJSON', 'inputJSON')
                    .addSelect('question.isSubQuestionFlg', 'isSubQuestionFlg')
                    .addSelect('question.hasSubQuestionFlg', 'hasSubQuestionFlg')
                    .from(Visit_1.Visit, 'visit')
                    .innerJoin(Question_1.Question, 'question', 'visit.visitID = question.visitVisitID');
            },
        })
    ], VisitQuestion);
    return VisitQuestion;
}());
exports.VisitQuestion = VisitQuestion;
//# sourceMappingURL=VisitQuestionView.js.map