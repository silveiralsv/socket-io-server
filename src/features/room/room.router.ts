import express from 'express'
import * as roomController from './room.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'

export const router = express.Router()

// Apply authentication middleware to all room routes
router.use(authMiddleware)

// CRUD routes
router.post('/', roomController.createRoom)
router.get('/', roomController.findAllRooms)
router.get('/:id', roomController.findOneRoom)
router.put('/:id', roomController.updateRoom)
router.delete('/:id', roomController.deleteRoom) 