import createError from "../utils/error.js"
import JWT from 'jsonwebtoken'
import User from '../models/userModel.js'

export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(createError(401, "Please log in again"))
    }
    const userDetails = await JWT.verify(token, process.env.JWT_SECRET)
    req.user = userDetails

    next()
}

export const authorizedRole = (...rols) => async (req, res, next) => {
    const currentUserRole = req.user.role
    if (!rols.includes(currentUserRole)) {
        return next(createError(403, "You do not have permission"))
    }
    next()
}

export const verifySubscription = async (req, res, next) => {
    const { id } = req.user
    const user = await User.findById(id)
    const subscription = user.subscription.status
    const currentUserRole = user.role
    if (currentUserRole !== 'ADMIN' && subscription !== 'active') {
        return next(createError(403, "please subscribe to access this"))
    }
    next()
}