import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import { router as healthRouter } from './features/healthCheck/healthCheck.router'
import { router as userRoutes } from './features/user/user.router'
import { router as messageRoutes } from './features/message/message.router'
import { router as roomRoutes } from './features/room/room.router'
import { errorMiddleware } from './middlewares/errorhandler.middleware'

export const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000', '*'],
    credentials: true,
  }),
)

// Security layer
app.use(helmet())

app.use(healthRouter)
app.use('/user', userRoutes)
app.use('/message', messageRoutes)
app.use('/room', roomRoutes)
app.use(errorMiddleware)
