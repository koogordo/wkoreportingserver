import express from 'express'
import { getRepository, getConnection, Repository } from 'typeorm'
import { Question } from '../../data/entity/Question'
import { InsertQuestionDto } from '../../data/dto/InsertQuestionDto'

const QuestionController = express.Router()

QuestionController.get(
    '/:questionkey/visitid',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(Question)
        try {
            const question = await repo.findOneOrFail({
                questionKey: req.params.questionkey,
                visitVisitID: req.params.visitid,
            })
            res.status(200).json(question)
        } catch (err) {
            res.status(404).json({
                success: false,
                status: 404,
                error: err,
                resource_id: {
                    questionKey: req.params.questionkey,
                    visitVisitID: req.params.visitid,
                },
                error_code: 'question_resource_not_found',
            })
        }
    }
)

QuestionController.put(
    '/',
    async (req: express.Request, res: express.Response) => {
        try {
            const repo = getRepository(Question)
            const question = await repo.create()
            // set new visit info to body coming in
            repo.save(question)
            res.status(200).json(question)
        } catch (err) {
            res.status(400).json({
                success: false,
                status: 400,
                error: err,
                error_code: 'resource_creation_failed',
            })
        }
    }
)
QuestionController.put(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        try {
            const repo = getRepository(Question)
            await repo.update(
                { questionKey: req.params.id, visitVisitID: req.params.visid },
                req.body.criteria
            )
            res.status(204).json({
                success: true,
                status: 204,
                success_code: 'resource_update_successful',
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                status: 400,
                error: err,
                error_code: 'resource_update_failed',
            })
        }
    }
)

QuestionController.post(
    '/',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(Question)

        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Question)
                .values(req.body.rows)
                .execute()

            // await repo.insert(req.body.rows)
            res.status(200).json({
                success: true,
                status: 200,
                success_code: 'bulk_insert_successful',
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                status: 400,
                error: err,
                error_code: 'bulk_insert__failed',
            })
        }
    }
)

QuestionController.delete(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        try {
            const repo = getRepository(Question)
            await repo.delete({
                questionKey: req.params.id,
                visitVisitID: req.params.visid,
            })
            res.status(204).json({
                success: true,
                status: 204,
                success_code: 'delete_successful',
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                status: 400,
                error: err,
                error_code: 'delete_failed',
            })
        }
    }
)

export default QuestionController
