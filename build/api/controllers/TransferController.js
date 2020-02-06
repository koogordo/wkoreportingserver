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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var WKODbAccess_1 = require("../../data/WKODbAccess");
var config_1 = require("../../config");
var workerpool = __importStar(require("workerpool"));
var _ = __importStar(require("lodash"));
var dao = new WKODbAccess_1.WKODbAccess(config_1.DbConfig);
var TransferController = express_1.default.Router();
var pool = workerpool.pool(__dirname + '/worker-scripts/processBatchWorker.js', {
    minWorkers: 3,
    maxWorkers: 3,
    workerType: 'thread',
});
TransferController.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var socketId, io, senderSocket, templates_1, batches, workerPromises, parsedVisitInfo, visits, qs, subqs, i, j, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                socketId = req.body.socketid;
                io = req.app.get('socketio');
                senderSocket = io.sockets.connected[socketId];
                if (!req.body.docs) return [3 /*break*/, 8];
                if (!senderSocket) return [3 /*break*/, 6];
                res.status(200).json({
                    ok: true,
                    msg: 'transfer_process_was_initiated',
                    status: 200,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, dao
                        .forms()
                        .findAll({ include_docs: true })];
            case 2:
                templates_1 = _a.sent();
                batches = _.chunk(req.body.docs, 3);
                workerPromises = batches.map(function (batch) {
                    return pool.exec('processBatch', [batch, templates_1]);
                });
                return [4 /*yield*/, Promise.all(workerPromises)];
            case 3:
                parsedVisitInfo = _a.sent();
                parsedVisitInfo = parsedVisitInfo.filter(function (r) {
                    return r !== undefined && r !== null;
                });
                visits = [];
                qs = [];
                subqs = [];
                for (i = 0; i < parsedVisitInfo.length; i++) {
                    if (parsedVisitInfo[i]) {
                        visits = visits.concat(parsedVisitInfo[i].visits);
                        for (j = 0; j < parsedVisitInfo[i].qssubqs.length; j++) {
                            qs = qs.concat(parsedVisitInfo[i].qssubqs[j].qs);
                            subqs = subqs.concat(parsedVisitInfo[i].qssubqs[j].subqs);
                        }
                    }
                }
                // let visitInsertRes: InsertResult
                // let questionInsertRes: InsertResult
                // let subQuestionInsertRes: InsertResult
                // const visitRepo = await getRepository(Visit)
                // visitInsertRes = await visitRepo.insert(visits)
                // const questionRepo = await getRepository(Question)
                // questionInsertRes = await questionRepo.insert(qs)
                // const subQuestionRepo = await getRepository(SubQuestion)
                // subQuestionInsertRes = await subQuestionRepo.insert(subqs)
                senderSocket.emit('transfer-result', {
                    ok: true,
                    visit: visits,
                    question: qs,
                    subquestion: subqs,
                });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                senderSocket.emit('transfer-error', {
                    ok: false,
                    error: e_1,
                    msg: 'error_during_transfer',
                });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(400).json({
                    ok: false,
                    msg: "no_sender_socet_with_id_" + socketId,
                    status: 400,
                });
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                res.status(400).json({
                    ok: false,
                    msg: 'request_body_requires_docs',
                    status: 400,
                });
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.default = TransferController;
//# sourceMappingURL=TransferController.js.map