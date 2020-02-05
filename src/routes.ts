import VisitController from './api/controllers/VisitController'
import QuestionController from './api/controllers/QuestionController'
import SubQuestionController from './api/controllers/SubQuestionController'
import ReportController from './api/controllers/ReportController'
import QueryController from './api/controllers/QueryController'
const routes = [
    { path: '/visit', controller: VisitController },
    { path: '/question', controller: QuestionController },
    { path: '/sub_question', controller: SubQuestionController },
    { path: '/report', controller: ReportController },
    { path: '/query', controller: QueryController },
]

export const configureRoutes = (routeBuilder: any) => {
    routes.forEach(routeBuilder)
}
