import express from 'express'
import { getRepository, getConnection, Repository, InsertResult } from 'typeorm'
import { Question } from '../../data/entity/Question'
import { InsertQuestionDto } from '../../data/dto/InsertQuestionDto'
import { WKODbAccess } from '../../data/WKODbAccess'
import { DbConfig } from '../../config'
import * as workerpool from 'workerpool'
import * as _ from 'lodash'
import { PlatformTools } from 'typeorm/platform/PlatformTools'
import { Visit } from '../../data/entity/Visit'
import { SubQuestion } from '../../data/entity/SubQuestion'
import { checkJwt, checkRole } from '../../middleware/JwtMiddleware'
const dao = new WKODbAccess(DbConfig)
const TransferController = express.Router()

TransferController.post(
    '/',
    [checkJwt, checkRole('ADMIN')],
    async (req: express.Request, res: express.Response) => {
        const socketId = req.body.socketid
        const io = req.app.get('socketio')
        const senderSocket = io.sockets.connected[socketId]

        if (req.body.docs) {
            if (senderSocket) {
                res.status(200).json({
                    ok: true,
                    msg: 'transfer_process_was_initiated',
                    status: 200,
                })
                try {
                    const templates = await dao
                        .forms()
                        .findAll({ include_docs: true })
                    const batches = _.chunk(req.body.docs, 3)

                    const pool = workerpool.pool(
                        __dirname +
                            '/../../worker-scripts/processBatchWorker.js',
                        {
                            minWorkers: 3,
                            maxWorkers: 3,
                            // workerType: 'thread',
                        }
                    )
                    const workerPromises = batches.map(batch => {
                        return pool.exec('processBatch', [batch, templates])
                    })
                    pool.terminate()
                    let parsedVisitInfo = await Promise.all(workerPromises)

                    parsedVisitInfo = parsedVisitInfo.filter(r => {
                        return r !== undefined && r !== null
                    })

                    let visits: any[] = []
                    let qs: any[] = []
                    let subqs: any[] = []
                    for (let i = 0; i < parsedVisitInfo.length; i++) {
                        if (parsedVisitInfo[i]) {
                            visits = visits.concat(parsedVisitInfo[i].visits)
                            for (
                                let j = 0;
                                j < parsedVisitInfo[i].qssubqs.length;
                                j++
                            ) {
                                qs = qs.concat(parsedVisitInfo[i].qssubqs[j].qs)
                                subqs = subqs.concat(
                                    parsedVisitInfo[i].qssubqs[j].subqs
                                )
                            }
                        }
                    }
                    let visitInsertRes: any
                    let questionInsertRes: any
                    let subQuestionInsertRes: any
                    if (visits.length > 0) {
                        const visitRepo = await getRepository(Visit)
                        visitInsertRes = await visitRepo.insert(visits)
                    } else {
                        visitInsertRes = {
                            ok: true,
                            msg: 'no visits so visits were ignored',
                        }
                    }
                    if (qs.length > 0) {
                        const questionRepo = await getRepository(Question)
                        questionInsertRes = await questionRepo.insert(qs)
                    } else {
                        questionInsertRes = {
                            ok: true,
                            msg: 'no questions so questions were ignored',
                        }
                    }
                    if (subqs.length > 0) {
                        const subQuestionRepo = await getRepository(SubQuestion)
                        subQuestionInsertRes = await subQuestionRepo.insert(
                            subqs
                        )
                    } else {
                        subQuestionInsertRes = {
                            ok: true,
                            msg:
                                'no sub_questions so sub_questions were ignored',
                        }
                    }

                    senderSocket.emit('transfer-result', {
                        ok: true,
                        visit: visitInsertRes,
                        question: questionInsertRes,
                        subquestion: subQuestionInsertRes,
                    })
                } catch (e) {
                    senderSocket.emit('transfer-error', {
                        ok: false,
                        error: e,
                        msg: 'error_during_transfer',
                    })
                }
            } else {
                res.status(400).json({
                    ok: false,
                    msg: `no_sender_socet_with_id_${socketId}`,
                    status: 400,
                })
            }
        } else {
            res.status(400).json({
                ok: false,
                msg: 'request_body_requires_docs',
                status: 400,
            })
        }
    }
)
export default TransferController
