import express from 'express'
import { getManager, getConnection } from 'typeorm'
import { checkJwt, checkRole } from '../../middleware/JwtMiddleware'

const QueryController = express.Router()

QueryController.post(
    '/',
    [checkJwt, checkRole('ADMIN')],
    async (req: express.Request, res: express.Response) => {
        const socketId = req.body.socketid
        const io = req.app.get('socketio')
        const senderSocket = io.sockets.connected[socketId]

        if (senderSocket) {
            try {
                const manager = await getManager()
                res.status(200).json({
                    ok: true,
                    status: 200,
                    msg: 'query_started',
                })
                const result = await manager.query(req.body.query)
                senderSocket.emit('query-result', result)
            } catch (e) {
                senderSocket.emit('query-error', e)
            }
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                msg: `Socket ${socketId} was invalid or socket does not exist.`,
            })
        }
    }
)

QueryController.get('/connection', async (req, res) => {
    try {
        const connection = await getConnection()
        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'connection_status',
            connectionInfo: {
                host: (connection.options as any).host,
                port: (connection.options as any).port,
            },
        })
    } catch (e) {
        res.status(404).json({
            ok: false,
            status: 400,
            error: e,
        })
    }
})

export default QueryController
