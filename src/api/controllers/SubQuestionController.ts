import express from 'express'
import { getRepository, getConnection } from 'typeorm'
import { SubQuestion } from '../../data/entity/SubQuestion'
import { InsertSubQuestionDto } from '../../data/dto/InsertSubQuestionDto'

const SubQuestionController = express.Router()

SubQuestionController.get(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(SubQuestion)
        const subQuestion = await repo.findOneOrFail(req.params.id)
        res.status(200).json(subQuestion)
    }
)

SubQuestionController.put(
    '/',
    async (req: express.Request, res: express.Response) => {
        try {
            const repo = getRepository(SubQuestion)
            const subQuestion = await repo.create()
            // set new visit info to body coming in
            repo.save(subQuestion)
            res.status(200).json(subQuestion)
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
SubQuestionController.put(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        try {
            const repo = getRepository(SubQuestion)
            await repo.update(
                { subQuestionID: Number.parseInt(req.params.id) },
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

SubQuestionController.post(
    '/',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(SubQuestion)
        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(SubQuestion)
                .values(req.body.rows)
                .execute()

            // const newSubQuestions: any[] = []
            // req.body.rows.forEach((row: any) => {
            //     newSubQuestions.push(repo.create(row))
            // })
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
                error_code: 'bulk_insert_failed',
            })
        }
    }
)

SubQuestionController.delete(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        try {
            const repo = getRepository(SubQuestion)
            await repo.delete({ subQuestionID: Number.parseInt(req.params.id) })
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
export default SubQuestionController
