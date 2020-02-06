import VisitController from './api/controllers/VisitController'
import QuestionController from './api/controllers/QuestionController'
import SubQuestionController from './api/controllers/SubQuestionController'
import ReportController from './api/controllers/ReportController'
import QueryController from './api/controllers/QueryController'
import TransferController from './api/controllers/TransferController'
const routes = [
    { path: '/visit', controller: VisitController },
    { path: '/question', controller: QuestionController },
    { path: '/sub_question', controller: SubQuestionController },
    { path: '/report', controller: ReportController },
    { path: '/query', controller: QueryController },
    { path: '/transfer', controller: TransferController },
]

export const configureRoutes = (routeBuilder: any) => {
    routes.forEach(routeBuilder)
}
