import express from 'express'
import UsersController from '../controllers/usersController.js'

import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

//public routes
router.post('/register', UsersController.userRegistration)
router.post('/login', UsersController.userLogin)

//protected routes
router.post('/change-password', authMiddleware, UsersController.changePassword)
router.get('/current-user', authMiddleware, UsersController.currentUser)



export default router