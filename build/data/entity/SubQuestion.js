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
var Question_1 = require("./Question");
var SubQuestion = /** @class */ (function () {
    function SubQuestion() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], SubQuestion.prototype, "subQuestionID", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 150 }),
        __metadata("design:type", String)
    ], SubQuestion.prototype, "parentQuestionKey", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 150 }),
        __metadata("design:type", String)
    ], SubQuestion.prototype, "parentVisitVisitID", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 150 }),
        __metadata("design:type", String)
    ], SubQuestion.prototype, "subQuestionQuestionKey", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 150 }),
        __metadata("design:type", String)
    ], SubQuestion.prototype, "subQuestionVisitVisitID", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Question_1.Question; }, function (question) { return question.subQuestions; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", Question_1.Question
        // @OneToOne(() => Question)
        // @JoinColumn()
        // subQuestion!: Question
        )
    ], SubQuestion.prototype, "parent", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' }),
        __metadata("design:type", Number)
    ], SubQuestion.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
        __metadata("design:type", Number)
    ], SubQuestion.prototype, "updatedAt", void 0);
    SubQuestion = __decorate([
        typeorm_1.Entity()
    ], SubQuestion);
    return SubQuestion;
}());
exports.SubQuestion = SubQuestion;
//# sourceMappingURL=SubQuestion.js.map