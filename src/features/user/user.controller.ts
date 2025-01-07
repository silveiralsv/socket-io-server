import { Request, Response, NextFunction } from 'express'
import * as userValidatonSchema from './dto/user.schemas'
import * as userServices from './user.service'

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedUser = userValidatonSchema.createUserSchema.parse(req.body)
    userServices.createUser(validatedUser)
    res.status(201).json(validatedUser)
  } catch (error) {
    next(error)
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {}
export async function logout(req: Request, res: Response, next: NextFunction) {}
export async function verifyLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
