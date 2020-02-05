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
var Visit = /** @class */ (function () {
    function Visit() {
    }
    __decorate([
        typeorm_1.PrimaryColumn('varchar', { length: 150 }),
        __metadata("design:type", String)
    ], Visit.prototype, "visitID", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 50 }),
        __metadata("design:type", String)
    ], Visit.prototype, "visitType", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 75 }),
        __metadata("design:type", String)
    ], Visit.prototype, "clientID", void 0);
    __decorate([
        typeorm_1.Column('datetime'),
        __metadata("design:type", String)
    ], Visit.prototype, "visitDate", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 75 }),
        __metadata("design:type", String)
    ], Visit.prototype, "visitOs", void 0);
    __decorate([
        typeorm_1.Column('varchar', { length: 150 }),
        __metadata("design:type", String)
    ], Visit.prototype, "clientFullName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Visit.prototype, "familyID", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Visit.prototype, "legacyClientID", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Question_1.Question; }, function (question) { return question.visit; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Visit.prototype, "questions", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' }),
        __metadata("design:type", Number)
    ], Visit.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
        __metadata("design:type", Number)
    ], Visit.prototype, "updatedAt", void 0);
    Visit = __decorate([
        typeorm_1.Entity()
    ], Visit);
    return Visit;
}());
exports.Visit = Visit;
//# sourceMappingURL=Visit.js.map