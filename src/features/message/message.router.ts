import express from 'express'
import * as messageController from './message.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'

export const router = express.Router()

// Apply authentication middleware to all message routes
router.use(authMiddleware)

// CRUD routes
router.post('/', messageController.createMessage)
router.get('/', messageController.findAllMessages)
router.get('/:id', messageController.findOneMessage)
router.put('/:id', messageController.updateMessage)
router.delete('/:id', messageController.deleteMessage)

// Room-specific routes
router.get('/room/:roomId', messageController.findMessagesByRoom) 