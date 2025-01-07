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
    await userServices.createUser(validatedUser)
    res.status(201).json(validatedUser)
  } catch (error) {
    next(error)
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = userValidatonSchema.loginSchema.parse(req.body)
    const user = await userServices.login(validatedData)

    //set a cookie token
    const { token, password, ...rest } = user
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours to live
    })

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}
export async function logout(req: Request, res: Response, next: NextFunction) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  res.status(200).json({ message: 'Logged out' })
}
export async function verifyLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(200).json(req.user)
}
