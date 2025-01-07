import { Request, NextFunction, Response } from 'express'
import prisma from '@prisma'
import { verifyToken } from '../utils/token'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Missing token',
      })
    }

    const authUser = verifyToken(token)

    if (!authUser?.userEmail) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: authUser.userEmail,
      },
    })

    if (!user || !user?.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid user',
      })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }
}
