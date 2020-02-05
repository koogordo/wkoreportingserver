import { ViewEntity, ViewColumn, Connection } from 'typeorm'
import { Visit } from './Visit'
import { Question } from './Question'

@ViewEntity({
    expression: (connection: Connection) =>
        connection
            .createQueryBuilder()
            .select('visit.visitID', 'visitID')
            .addSelect('visit.visitType', 'visitType')
            .addSelect('visit.clientID', 'clientID')
            .addSelect('visit.visitDate', 'visitDate')
            .addSelect('visit.visitOs', 'visitOs')
            .addSelect('visit.clientFullName', 'clientFullName')
            .addSelect('question.questionKey', 'questionKey')
            .addSelect('question.questionAnswer', 'questionAnswer')
            .addSelect('question.questionType', 'questionType')
            .addSelect('question.formIndexJSON', 'formIndexJSON')
            .addSelect('question.questionJSON', 'questionJSON')
            .addSelect('question.inputJSON', 'inputJSON')
            .addSelect('question.isSubQuestionFlg', 'isSubQuestionFlg')
            .addSelect('question.hasSubQuestionFlg', 'hasSubQuestionFlg')
            .from(Visit, 'visit')
            .innerJoin(
                Question,
                'question',
                'visit.visitID = question.visitVisitID'
            ),
})
export class VisitQuestion {
    @ViewColumn()
    visitID!: string

    @ViewColumn()
    visitType!: string

    @ViewColumn()
    clientID!: string

    @ViewColumn()
    visitDate!: string

    @ViewColumn()
    visitOs!: string

    @ViewColumn()
    clientFullName!: string

    @ViewColumn()
    questionKey!: string

    @ViewColumn()
    questionAnswer!: string

    @ViewColumn()
    questionType!: string

    @ViewColumn()
    formIndexJSON!: string

    @ViewColumn()
    questionJSON!: string

    @ViewColumn()
    inputJSON!: string

    @ViewColumn()
    isSubQuestionFlg!: boolean

    @ViewColumn()
    hasSubQuestionFlg!: boolean
}
