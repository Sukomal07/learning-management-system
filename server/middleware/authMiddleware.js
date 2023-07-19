import createError from "../utils/error.js"
import JWT from 'jsonwebtoken'

export const isLoggedIn = async(req, res, next) =>{
    const {token} = req.cookies

    if(!token){
        return next(createError(401, "Please log in again"))
    }
    const userDetails = await JWT.verify(token, process.env.JWT_SECRET)
    req.user = userDetails

    next()
}