import express from 'express'
import { getLoginPage, getProtectedPage, getAuthRedirect, createUser, deleteUser, getUser, updateUser } from '../controllers/userControllers.mjs'

const router = express.Router()

router.get('/', getLoginPage)
router.get('/login', getProtectedPage)
router.get('/protected', getAuthRedirect)
router.get('/users', getUser)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router