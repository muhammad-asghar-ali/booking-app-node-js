import express from "express"
import { createHotel, deleteHotel, getHotelById, getHotels, updateHotel, countByCities, countByType, getHotelRooms  } from "../controllers/hotel.controllers.js"
import { verifyAdmin } from "../middlewares/verfitToken.middleware.js"

const router = express.Router()

router.post('/', verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)
router.get('/find/:id', getHotelById)
router.get('/', getHotels)

router.get('/countbycities', countByCities)
router.get('/countbytype', countByType)
router.get('/room/:id', getHotelRooms)



export default router