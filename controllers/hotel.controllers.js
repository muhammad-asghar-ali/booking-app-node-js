import HotelModel from '../models/hotel.model.js'
import RoomModel from "../models/room.model.js"

export const createHotel = async (req, res, next) => {
    try {
        const data = req.body

        const hostel = await HotelModel.create(data)
        res.status(201).json({
            success: true,
            message: "hotel created successfully",
            data: hostel
        })

    } catch (err) {
        next(err)
    }
}

export const getHotels = async (req, res, next) => {
    try {
        const allHotels = await HotelModel.find({}).lean()
        res.status(200).json({
            success: true,
            message: "list the hotels",
            data: allHotels
        })
    } catch (err) {
        next(err)
    }
}

export const getHotelById = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const hotel = await HotelModel.findById(id)
        if (!hotel) {
            return res.status(404).json({
                sucess: false,
                message: "no hotel found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "get hotel",
            data: hotel
        })
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async (req, res, next) => {
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

        const hotel = await HotelModel.findById(id, { $set: data }, {
            new: true
        })
        if (!hotel) {
            return res.status(404).json({
                sucess: false,
                message: "no hotel found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "hotel updated successfully",
            data: hotel
        })
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const hotel = await HotelModel.findByIdAndDelete(id)
        if (!hotel) {
            return res.status(404).json({
                sucess: false,
                message: "no hotel found to delete",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "hotel deleted successfully",
            data: null
        })
    } catch (err) {
        next(err)
    }
}

export const countByCities = async (req, res, next) => {
    try {
        const cities = req.query.cities.split(",")

        const list = await Promise.all(cities.map(async city => {
            return HotelModel.countDocuments({city: city})
        }))
        res.status(200).json({
            success: true,
            message: "hotel count by city",
            data: list
        })
    } catch (err) {
        next(err)
    }
}

export const countByType = async (req, res, next) => {
    try {
        const type = req.query.type
       
        const count = await HotelModel.countDocuments({type: type})
        res.status(200).json({
            success: true,
            message: "hotel count by type",
            data: count
        })
    } catch (err) {
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }
        const hotel = await HotelModel.findById(id)

        if (!hotel) {
            return res.status(404).json({
                sucess: false,
                message: "no hotel found",
                data: null
            })
        }

        const list = await Promise.all(hotel.rooms.map(roomId => {
            return RoomModel.findById(roomId)
        }))

        res.status(200).json({
            success: true,
            message: "room by hotel",
            data: list
        })
    } catch (err) {
        next(err)
    }
}