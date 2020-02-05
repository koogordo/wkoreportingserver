export interface UpdateSubQuestionDto {
    update:
        | { parentQuestionKey: string; parentVisitVisitID: string }
        | { subQuestionQuestionKey: string; subQuestionVisitVisitID: string }
    changes: any
}
