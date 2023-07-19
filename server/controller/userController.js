import createError from "../utils/error.js"
import User from '../models/userModel.js'

export const signup = async(req, res, next) => {
    const {name, email , password} = req.body

    if(!name || !email || !password){
        return next(createError(400,"All input feilds required"))
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return next(createError(400, "Email already exists"))
    }
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'http'
        }
    })

    if(!user){
        return next(createError(400 , "User signup failed , Please try again"))
    }

    await user.save()
    user.password = undefined
    const token = await user.generateToken()

    res.cookie('token', token, {
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure:true
    })
    res.status(201).json({
        success:true,
        message:'User created Successfully',
        user
    })
}

export const login = (req, res) => {

}

export const logout = (req, res) => {

}

export const getProfile = (req, res) => {

}