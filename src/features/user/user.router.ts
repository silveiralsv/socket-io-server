import express from 'express'
import * as userController from './user.controller'

export const router = express.Router()

router.post('/create-user', userController.createUser)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.post('/verify-login', userController.verifyLogin)
