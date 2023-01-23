import express from 'express'
import UsersController from '../controllers/usersController.js'

const router = express.Router()

router.post('/register', UsersController.userRegistration)

export default router