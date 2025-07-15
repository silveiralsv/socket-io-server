import prisma from '@prisma'
import { CreateMessageDto, UpdateMessageDto, MessageQueryDto } from './dto/message.schemas'

export async function createMessage(data: CreateMessageDto, userId: number) {
  // Verify room exists
  const room = await prisma.room.findUnique({
    where: { id: data.roomId }
  })

  if (!room) {
    throw new Error('Room not found')
  }

  // Verify user exists and is active
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user || !user.isActive) {
    throw new Error('User not found or inactive')
  }

  return await prisma.message.create({
    data: {
      text: data.text,
      roomId: data.roomId,
      userId: userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      room: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}

export async function findAllMessages(query: MessageQueryDto) {
  const { roomId, userId, page, limit } = query
  const skip = (page - 1) * limit

  const where: any = {}
  
  if (roomId) {
    where.roomId = parseInt(roomId)
  }
  
  if (userId) {
    where.userId = parseInt(userId)
  }

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        room: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    }),
    prisma.message.count({ where })
  ])

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }
}

export async function findOneMessage(id: number) {
  const message = await prisma.message.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      room: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })

  if (!message) {
    throw new Error('Message not found')
  }

  return message
}

export async function updateMessage(id: number, data: UpdateMessageDto, userId: number) {
  // Check if message exists and belongs to user
  const existingMessage = await prisma.message.findUnique({
    where: { id },
    include: { user: true }
  })

  if (!existingMessage) {
    throw new Error('Message not found')
  }

  if (existingMessage.userId !== userId) {
    throw new Error('Unauthorized to update this message')
  }

  return await prisma.message.update({
    where: { id },
    data: {
      text: data.text,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      room: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}

export async function deleteMessage(id: number, userId: number) {
  // Check if message exists and belongs to user
  const existingMessage = await prisma.message.findUnique({
    where: { id },
    include: { user: true }
  })

  if (!existingMessage) {
    throw new Error('Message not found')
  }

  if (existingMessage.userId !== userId) {
    throw new Error('Unauthorized to delete this message')
  }

  await prisma.message.delete({
    where: { id }
  })

  return { message: 'Message deleted successfully' }
}

export async function findMessagesByRoom(roomId: number, query: MessageQueryDto) {
  const { page, limit } = query
  const skip = (page - 1) * limit

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where: { roomId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        room: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    }),
    prisma.message.count({ where: { roomId } })
  ])

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }
} 