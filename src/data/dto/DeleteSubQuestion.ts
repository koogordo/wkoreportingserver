export interface DeleteSubQuestionDto {
    delete:
        | { parentQuestionKey: string; parentVisitVisitID: string }
        | { subQuestionQuestionKey: string; subQuestionVisitVisitID: string }
}
