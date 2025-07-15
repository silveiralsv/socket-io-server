import { Request, Response, NextFunction } from 'express'
import * as roomValidationSchema from './dto/room.schemas'
import * as roomServices from './room.service'

export async function createRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = roomValidationSchema.createRoomSchema.parse(req.body)
    const room = await roomServices.createRoom(validatedData)

    res.status(201).json({
      success: true,
      data: room
    })
  } catch (error) {
    next(error)
  }
}

export async function findAllRooms(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rooms = await roomServices.findAllRooms()

    res.status(200).json({
      success: true,
      data: rooms
    })
  } catch (error) {
    next(error)
  }
}

export async function findOneRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID'
      })
    }

    const room = await roomServices.findOneRoom(id)

    res.status(200).json({
      success: true,
      data: room
    })
  } catch (error) {
    next(error)
  }
}

export async function updateRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID'
      })
    }

    const validatedData = roomValidationSchema.updateRoomSchema.parse(req.body)
    const room = await roomServices.updateRoom(id, validatedData)

    res.status(200).json({
      success: true,
      data: room
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID'
      })
    }

    const result = await roomServices.deleteRoom(id)

    res.status(200).json({
      success: true,
      message: result.message
    })
  } catch (error) {
    next(error)
  }
} 