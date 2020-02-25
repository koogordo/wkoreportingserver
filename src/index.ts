import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { createServer, Server } from 'http'
import { configureRoutes } from './routes'
import express from 'express'
import cors from 'cors'
import * as socketIo from 'socket.io'
import * as fs from 'fs'
//controllers

createConnection()
    .then(async connection => {
        const app = express()
        const server = createServer(app)
        const io = socketIo.listen(server, {
            origins: '*:*',
            pingTimeout: 60000,
        })
        app.set('socketio', io)
        const mainRouter = express.Router()

        app.use(cors())
        app.use(express.json({ limit: '50mb' }))
        app.use(express.urlencoded({ extended: true }))

        // main subdomains
        configureRoutes((route: any) => {
            mainRouter.use(route.path, route.controller)
        })
        app.use('/', mainRouter)
        server.listen(3001, () => {
            console.log('REPORTING SERVICE IS LISTENING ON 3001')
        })
        io.on('connect', socket => {
            socket.emit('socketid', socket.id)
        })
    })
    .catch(error => console.log(error))
