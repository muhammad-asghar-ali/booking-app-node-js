import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token

        if (!token) {
            return res.status(401).json({
                sccess: false,
                message: "you are not authenticated",
                data: null
            })
        }

        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                return res.status(403).json({
                    sccess: false,
                    message: "token is not valid",
                    data: null
                })
            }
            req.user.info = user
            next()
        })
    } catch (err) {
        next(err)
    }
}

export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        const { id, isAdmin } = req.user.info
        if (id === req.params.id || isAdmin) {
            next()
        } else {
            return res.status(403).json({
                sccess: false,
                message: "you are not authorized",
                data: null
            })
        }
    })
}

export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        const { isAdmin } = req.user.info
        if (isAdmin) {
            next()
        } else {
            return res.status(403).json({
                sccess: false,
                message: "you are not authorized",
                data: null
            })
        }
    })
}