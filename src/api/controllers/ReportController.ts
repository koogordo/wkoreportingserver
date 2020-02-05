import express from 'express'
import { getRepository, getConnection, Repository, getManager } from 'typeorm'
import { VisitQuestion } from '../../data/entity/VisitQuestionView'

const ReportController = express.Router()

ReportController.get('/questions', async (req, res) => {
    // const socketId = req.params.socketid

    // const io = req.app.get('socketio')
    // req.query = {
    //   cols: [The question keys which will become columns on client],
    //   conditions: [Limit results by conditions put on ViewQuestion Columns -> 'whereType|conditionedColumn|symbol|condition']
    // }

    // const senderSocket = io.sockets.connected[socketId]
    let vqs = await getRepository(VisitQuestion)
        .createQueryBuilder('vq')
        .where('vq.questionKey IN (:...cols)', { cols: req.query.cols })

    // parse where conditions and add them to query
    for (let i = 0; i < req.query.conditions.length; i++) {
        const parsedConditionString = req.query.conditions[i].split('|')
        const conditionData: any = {}
        conditionData[parsedConditionString[0]] = isNaN(
            parsedConditionString[2]
        )
            ? parsedConditionString[2]
            : Number.parseInt(parsedConditionString[2])
        const whereCondition = `vq.${parsedConditionString[0]} ${parsedConditionString[1]} :${parsedConditionString[0]}`
        vqs = vqs.andWhere(whereCondition, conditionData)
    }

    const result = await vqs.getRawMany()
    res.status(200).json(result)
    // if (senderSocket) {
    //     // const vqs = await getRepository(VisitQuestion)
    //     //     .createQueryBuilder('vq')
    //     //     .where('vq.questionKey = :key', { key: 'Visit Date' })
    //     //     .getMany()
    //     // res.status(200).json(vqs)
    // } else {
    //     res.status(404).json({
    //         ok: false,
    //         status: 404,
    //         msg: `Socket ${socketId} was invalid or socket does not exist.`,
    //     })
    // }
})

ReportController.post('/query', async (req, res) => {
    const socketId = req.body.socketid
    const io = req.app.get('socketio')
    const senderSocket = io.sockets.connected[socketId]
    const manager = await getManager()

    if (senderSocket) {
        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'query_started',
        })
        const result = await manager.query(req.body.query)
        senderSocket.emit('msg', result)
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            msg: `Socket ${socketId} was invalid or socket does not exist.`,
        })
    }
})

export default ReportController
