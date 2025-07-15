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

  // Handle dynamic topics with a generic event handler
  socket.on('publish', (topic: string, message: any) => {
    console.log(`Message received on topic '${topic}':`, message, socket.data)

    // Emit to the specific topic
    io.emit(topic, {
      message,
      user: socket.data.user.name,
      timestamp: new Date().toISOString(),
    })
  })

  // Handle joining specific rooms/topics
  socket.on('join', (topic: string) => {
    socket.join(topic)
    console.log(`User ${socket.data.user.name} joined topic: ${topic}`)

    // Notify others in the room
    socket.to(topic).emit('user_joined', {
      user: socket.data.user.name,
      topic,
      timestamp: new Date().toISOString(),
    })
  })

  // Handle leaving specific rooms/topics
  socket.on('leave', (topic: string) => {
    socket.leave(topic)
    console.log(`User ${socket.data.user.name} left topic: ${topic}`)

    // Notify others in the room
    socket.to(topic).emit('user_left', {
      user: socket.data.user.name,
      topic,
      timestamp: new Date().toISOString(),
    })
  })

  // Handle room-specific messages
  socket.on('room_message', (topic: string, message: any) => {
    console.log(`Room message on '${topic}':`, message, socket.data)

    // Emit only to users in the specific room
    io.to(topic).emit('room_message', {
      message,
      user: socket.data.user.name,
      topic,
      timestamp: new Date().toISOString(),
    })
  })

  // Keep the original message event for backward compatibility
  socket.on('message', (message) => {
    console.log('Message received:', message, socket.data)
    io.emit('message', message, socket.data.user.name)
  })
})

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
