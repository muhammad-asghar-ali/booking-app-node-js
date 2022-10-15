import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controllers.js"
import { verifyAdmin, verifyUser } from "../middlewares/verfitToken.middleware.js"

const router = express.Router()

router.put('/:id', verifyUser, updateUser)
router.get('/', verifyAdmin, getUser)
router.get('/:id', verifyUser, getUsers)
router.delete('/:id', verifyUser, deleteUser)


export default router