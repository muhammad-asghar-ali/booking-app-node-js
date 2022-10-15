import dotenv from "dotenv"
import express from "express"
import mongoose from 'mongoose'
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()

import UserRoutes from "./routes/users.route.js"
import AuthRoutes from "./routes/auth.route.js"
import HotelRoutes from "./routes/hotels.route.js"
import RoomRoutes from "./routes/rooms.route.js"


const app = express()

app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, minPoolSize: 50 });
mongoose.connection
    .once('open', () => { console.log("connection open"); })
    .on('error', err => {
        console.log(err);
        console.log('DB is not connected');
        throw err;
    })

const port = process.env.PORT || 3001

app.use("/api/v1/hotels", HotelRoutes)
app.use("/api/v1/rooms", RoomRoutes)
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/users", UserRoutes)

// error handling
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "something went wrong"
    const stack = err.stack
    return res.status(status).json({
        success: false,
        status,
        message,
        stack
    }) 
}) 

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})