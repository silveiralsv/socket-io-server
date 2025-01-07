import { createServer } from 'node:http'
import { app } from './src/app'
import { Server } from 'socket.io'

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('message', (message) => {
    console.log('Message received:', message)
    io.emit('message', message)
  })
})

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
