import express from 'express'
import * as userController from './user.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'

export const router = express.Router()

router.post('/create', userController.createUser)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.post('/verify-login', authMiddleware, userController.verifyLogin)
