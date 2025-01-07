import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { router as healthRouter } from './features/healthCheck/healthCheck.router'
import { router as userRoutes } from './features/user/user.router'

export const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['http://localhost:3000', '*'],
    credentials: false,
  }),
)

// Security layer
app.use(helmet())

app.use(healthRouter)
app.use('/user', userRoutes)
