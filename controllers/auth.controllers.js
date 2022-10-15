import bcrpyt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"

export const register = async (req, res, next) => {
    try {
        const data = req.body

        if (!data.username || !data.email || !data.password) {
            return res.status(400).json({
                success: false,
                message: "username or email or password is missing",
                data: null
            })
        }

        const alreadyExist = await UserModel.findOne({ email: data.email })

        if (alreadyExist) {
            return res.status(400).json({
                success: false,
                message: "user aleady register with this email",
                data: null
            })
        }

        const salt = bcrpyt.genSaltSync(10)
        const hash = bcrpyt.hashSync(data.password, salt)

        const user = await UserModel.create({
            ...data,
            password: hash,
        })

        res.status(201).json({
            success: true,
            message: "user registerd",
            data: user
        })
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email or password is missing",
                data: null
            })
        }

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: null
            })
        }

        const isPasswordCorrect = await bcrpyt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "wrong password or user name",
                data: null
            })
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password: oriPassword, isAdmin, ...info } = user._doc

        res
            .cookie("access_token", token, {
                httpOnly: true
            })
            .status(200).json({
                success: true,
                message: "user login successfully",
                data: info,
            })

    } catch (err) {
        next(err)
    }
}