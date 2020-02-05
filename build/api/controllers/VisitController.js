"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var Visit_1 = require("../../data/entity/Visit");
var VisitController = express_1.default.Router();
VisitController.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, visit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = typeorm_1.getRepository(Visit_1.Visit);
                return [4 /*yield*/, repo.findOneOrFail(req.params.id)];
            case 1:
                visit = _a.sent();
                res.status(200).json(visit);
                return [2 /*return*/];
        }
    });
}); });
VisitController.put('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, visit, insertVisitDto, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = typeorm_1.getRepository(Visit_1.Visit);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, repo.create()
                    // set new visit info to body coming in
                ];
            case 2:
                visit = _a.sent();
                insertVisitDto = req.body;
                visit.visitDate = insertVisitDto.visitDate;
                visit.clientID = insertVisitDto.clientID;
                visit.visitType = insertVisitDto.visitType;
                visit.visitID = insertVisitDto.visitID;
                visit.clientFullName = insertVisitDto.clientFullName;
                visit.visitOs = insertVisitDto.visitOs;
                repo.save(visit);
                res.status(200).json({
                    success: true,
                    status: 200,
                    pk: visit.visitID,
                    success_code: 'visit_resource_created',
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).json({
                    success: false,
                    status: 400,
                    error: err_1,
                    error_code: 'visit_resource_creation_failed',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
VisitController.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = typeorm_1.getRepository(Visit_1.Visit);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, repo.update({ visitID: req.params.id }, req.body)];
            case 2:
                _a.sent();
                res.status(204).json({
                    success: true,
                    status: 204,
                    success_code: 'resource_update_successful',
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400).json({
                    success: false,
                    status: 400,
                    error: err_2,
                    error_code: 'resource_update_failed',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
VisitController.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(Visit_1.Visit)
                        .values(req.body.rows)
                        .execute()];
            case 1:
                _a.sent();
                res.status(204).json({
                    success: true,
                    status: 204,
                    success_code: 'bulk_insert_successful',
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json({
                    success: false,
                    status: 400,
                    error: err_3,
                    error_code: 'bulk_insert__failed',
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
VisitController.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = typeorm_1.getRepository(Visit_1.Visit);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, repo.delete({ visitID: req.params.id })];
            case 2:
                _a.sent();
                res.status(204).json({
                    success: true,
                    status: 204,
                    success_code: 'delete_successful',
                });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json({
                    success: false,
                    status: 400,
                    error: err_4,
                    error_code: 'delete_failed',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = VisitController;
//# sourceMappingURL=VisitController.js.map