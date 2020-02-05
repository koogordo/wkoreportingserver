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
var SubQuestion_1 = require("./SubQuestion");
var Visit_1 = require("./Visit");
var Question = /** @class */ (function () {
    // @Unique('unique_questionkey_visitVisitID', ['questionKey', 'visitVisitID'])
    function Question() {
    }
    __decorate([
        typeorm_1.PrimaryColumn('varchar', { length: 150, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "questionKey", void 0);
    __decorate([
        typeorm_1.PrimaryColumn('varchar', { length: 150, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "visitVisitID", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 2000, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "questionAnswer", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "questionType", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 2000, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "formIndexJSON", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 5000, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "questionJSON", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 5000, unique: false }),
        __metadata("design:type", String)
    ], Question.prototype, "inputJSON", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Question.prototype, "isSubQuestionFlg", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Question.prototype, "hasSubQuestionFlg", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return SubQuestion_1.SubQuestion; }, function (subQuestion) { return subQuestion.parent; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Question.prototype, "subQuestions", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Visit_1.Visit; }, function (visit) { return visit.questions; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", Question)
    ], Question.prototype, "visit", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' }),
        __metadata("design:type", Number)
    ], Question.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
        __metadata("design:type", Number)
    ], Question.prototype, "updatedAt", void 0);
    Question = __decorate([
        typeorm_1.Entity()
        // @Unique('unique_questionkey_visitVisitID', ['questionKey', 'visitVisitID'])
    ], Question);
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map