"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VisitController_1 = __importDefault(require("./api/controllers/VisitController"));
var QuestionController_1 = __importDefault(require("./api/controllers/QuestionController"));
var SubQuestionController_1 = __importDefault(require("./api/controllers/SubQuestionController"));
var ReportController_1 = __importDefault(require("./api/controllers/ReportController"));
var QueryController_1 = __importDefault(require("./api/controllers/QueryController"));
var TransferController_1 = __importDefault(require("./api/controllers/TransferController"));
var routes = [
    { path: '/visit', controller: VisitController_1.default },
    { path: '/question', controller: QuestionController_1.default },
    { path: '/sub_question', controller: SubQuestionController_1.default },
    { path: '/report', controller: ReportController_1.default },
    { path: '/query', controller: QueryController_1.default },
    { path: '/transfer', controller: TransferController_1.default },
];
exports.configureRoutes = function (routeBuilder) {
    routes.forEach(routeBuilder);
};
//# sourceMappingURL=routes.js.map