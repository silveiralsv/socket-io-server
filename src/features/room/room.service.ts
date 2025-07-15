import prisma from '@prisma'
import { CreateRoomDto, UpdateRoomDto } from './dto/room.schemas'

export async function createRoom(data: CreateRoomDto) {
  return await prisma.room.create({
    data: {
      name: data.name,
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })
}

export async function findAllRooms() {
  return await prisma.room.findMany({
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function findOneRoom(id: number) {
  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  if (!room) {
    throw new Error('Room not found')
  }

  return room
}

export async function updateRoom(id: number, data: UpdateRoomDto) {
  const existingRoom = await prisma.room.findUnique({
    where: { id }
  })

  if (!existingRoom) {
    throw new Error('Room not found')
  }

  return await prisma.room.update({
    where: { id },
    data: {
      name: data.name,
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })
}

export async function deleteRoom(id: number) {
  const existingRoom = await prisma.room.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  if (!existingRoom) {
    throw new Error('Room not found')
  }

  // Check if room has messages
  if (existingRoom._count.messages > 0) {
    throw new Error('Cannot delete room with messages')
  }

  await prisma.room.delete({
    where: { id }
  })

  return { message: 'Room deleted successfully' }
} 