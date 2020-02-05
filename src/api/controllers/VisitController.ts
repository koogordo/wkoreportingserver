import express from 'express'
import { getRepository, getConnection } from 'typeorm'
import { Visit } from '../../data/entity/Visit'
import { InsertVisitDto } from '../../data/dto/InsertVisitDto'

const VisitController = express.Router()

VisitController.get(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(Visit)
        const visit = await repo.findOneOrFail(req.params.id)
        res.status(200).json(visit)
    }
)

VisitController.put(
    '/',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(Visit)
        try {
            const visit = await repo.create()
            // set new visit info to body coming in
            const insertVisitDto: InsertVisitDto = req.body as InsertVisitDto

            visit.visitDate = insertVisitDto.visitDate
            visit.clientID = insertVisitDto.clientID
            visit.visitType = insertVisitDto.visitType
            visit.visitID = insertVisitDto.visitID
            visit.clientFullName = insertVisitDto.clientFullName
            visit.visitOs = insertVisitDto.visitOs
            repo.save(visit)
            res.status(200).json({
                success: true,
                status: 200,
                pk: visit.visitID,
                success_code: 'visit_resource_created',
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                status: 400,
                error: err,
                error_code: 'visit_resource_creation_failed',
            })
        }
    }
)
VisitController.put(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(Visit)
        try {
            await repo.update({ visitID: req.params.id }, req.body)
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

VisitController.post(
    '/',
    async (req: express.Request, res: express.Response) => {
        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Visit)
                .values(req.body.rows)
                .execute()
            res.status(204).json({
                success: true,
                status: 204,
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

VisitController.delete(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        const repo = getRepository(Visit)
        try {
            await repo.delete({ visitID: req.params.id })
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
export default VisitController
