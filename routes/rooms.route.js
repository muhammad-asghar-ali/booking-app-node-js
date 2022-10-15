import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.controllers.js"
import { verifyAdmin } from "../middlewares/verfitToken.middleware.js"

const router = express.Router()

router.post('/:hotelId', verifyAdmin, createRoom)
router.get('/', getRooms)
router.get('/:id', getRoom)
router.put('availability/:id', updateRoomAvailability)

router.put('/:id', verifyAdmin, updateRoom) 
router.delete('/:id', verifyAdmin, deleteRoom)

export default router