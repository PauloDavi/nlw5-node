import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'

import { routes } from './routes'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.get('/pages/client', (request, response) => response.render('html/client.html'))

const http = createServer(app)
const io = new Server(http)

io.on('connection', () => {})

app.use(express.json())

app.use(routes)

export { http, io }
