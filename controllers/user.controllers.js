import UserModel from "../models/user.model.js"

export const getUser = async (req, res, next) => {
    try{
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const user = await UserModel.findById(id)
        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "no user found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "get user",
            data: user
        })
    } catch(err) {
        next(err)
    }
}

export const getUsers = async (req, res, next) => {
    try{
        const allUsers = await UserModel.find({}).lean()
        res.status(200).json({
            success: true,
            message: "list the users",
            data: allUsers
        })
    } catch(err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try{
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const user = await UserModel.findById(id, { $set: data }, {
            new: true,
            overwrite: true
        })
        if (!hotel) {
            return res.status(404).json({
                sucess: false,
                message: "no user found",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: user
        })
    } catch(err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                sucess: false,
                message: "id is missing",
                data: null
            })
        }

        const user = await UserModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "no user found to delete",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            hotel: null
        })
    } catch(err) {
        next(err)
    }
}
