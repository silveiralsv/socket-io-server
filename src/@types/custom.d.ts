import { Request } from 'express'
// This will allow us to add the user property to the request object in the Express library
// this will be necessary to use the user object in the request object in the routes

type User = {
  id: number
  email: string
  name: string
  password: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
