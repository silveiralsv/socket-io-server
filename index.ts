import { createServer } from 'node:http'
import { app } from './src/app'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { sockerIoAuthMiddleware } from './src/middlewares/sockerAuth.middleware'

dotenv.config()

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.use(sockerIoAuthMiddleware)

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('message', (message) => {
    console.log('Message received:', message, socket.data)
    io.emit('message', message, socket.data.user.name)
  })
})

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
