import { Request, Response, NextFunction } from 'express'
import * as messageValidationSchema from './dto/message.schemas'
import * as messageServices from './message.service'

export async function createMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = messageValidationSchema.createMessageSchema.parse(req.body)
    const userId = (req as any).user.id
    const message = await messageServices.createMessage(validatedData, userId)

    res.status(201).json({
      success: true,
      data: message
    })
  } catch (error) {
    next(error)
  }
}

export async function findAllMessages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedQuery = messageValidationSchema.messageQuerySchema.parse(req.query)
    const result = await messageServices.findAllMessages(validatedQuery)

    res.status(200).json({
      success: true,
      data: result.messages,
      pagination: result.pagination
    })
  } catch (error) {
    next(error)
  }
}

export async function findOneMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID'
      })
    }

    const message = await messageServices.findOneMessage(id)

    res.status(200).json({
      success: true,
      data: message
    })
  } catch (error) {
    next(error)
  }
}

export async function updateMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID'
      })
    }

    const validatedData = messageValidationSchema.updateMessageSchema.parse(req.body)
    const userId = (req as any).user.id
    const message = await messageServices.updateMessage(id, validatedData, userId)

    res.status(200).json({
      success: true,
      data: message
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID'
      })
    }

    const userId = (req as any).user.id
    const result = await messageServices.deleteMessage(id, userId)

    res.status(200).json({
      success: true,
      message: result.message
    })
  } catch (error) {
    next(error)
  }
}

export async function findMessagesByRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const roomId = parseInt(req.params.roomId)
    
    if (isNaN(roomId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID'
      })
    }

    const validatedQuery = messageValidationSchema.messageQuerySchema.parse(req.query)
    const result = await messageServices.findMessagesByRoom(roomId, validatedQuery)

    res.status(200).json({
      success: true,
      data: result.messages,
      pagination: result.pagination
    })
  } catch (error) {
    next(error)
  }
} 