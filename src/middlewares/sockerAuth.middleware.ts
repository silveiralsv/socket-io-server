import prisma from '@prisma'
import { Socket } from 'socket.io'
import { verifyToken } from '../utils/token'

export async function sockerIoAuthMiddleware(
  socket: Socket,
  next: (err?: any) => void,
) {
  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error('Missing token'))
  }

  const authUser = verifyToken(token)

  if (!authUser?.userEmail) {
    return next(new Error('Invalid token'))
  }

  const user = await prisma.user.findUnique({
    where: {
      email: authUser.userEmail,
    },
  })

  if (!user || !user?.isActive) {
    return next(new Error('Invalid user'))
  }

  const { password: _, ...userWithoutPassword } = user

  socket.data.user = userWithoutPassword
  next()
}
