import RoomModel from "../models/room.model.js"
import HotelModel from "../models/hotel.model.js"

export const createRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId
        const data = req.body

        if (!hotelId) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        if (!data.title || !data.price || !data.maxPeople) {
            return res.status(400).json({
                sucess: false,
                message: "missing room details",
                data: null
            })
        }

        const room = await RoomModel.create(data)

        await HotelModel.findByIdAndUpdate(hotelId, {
            $push: { rooms: room._id }
        })

        res.status(201).json({
            sucess: true,
            message: "room created successfully",
            data: room
        })
    } catch (err) {
        next(err)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const room = await RoomModel.findById(id)
        if (!room) {
            return res.status(404).json({
                sucess: false,
                message: "no room found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "get room",
            data: room
        })
    } catch (err) {
        next(err)
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const allRooms = await RoomModel.find({}).lean()
        res.status(200).json({
            success: true,
            message: "list the rooms",
            data: allRooms
        })
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const room = await RoomModel.findById(id, { $set: data }, {
            new: true
        })
        if (!room) {
            return res.status(404).json({
                sucess: false,
                message: "no room found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "room updated successfully",
            data: room
        })
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId
        if (!hotelId) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const room = await RoomModel.findByIdAndDelete()

        await HotelModel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: id }
        })
        res.status(200).json({
            success: true,
            message: "room deleted",
            data: room
        })
    } catch (err) {
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        const { id } = req.params
        const dates = req.body.dates
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        await RoomModel.findOne({"roomNumbers._id": id}, {
            $push: {
                "roomNumbers.$.unavailableDate": dates
            }
        })


        res.status(200).json({
            success: true,
            message: "room updated successfully",
            data: room
        })
    } catch (err) {
        next(err)
    }
}
