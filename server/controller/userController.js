import createError from "../utils/error.js"
import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return next(createError(401, "All input feilds required"))
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(createError(401, "Email already exists"))
        }
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: 'http'
            }
        })
        if (!user) {
            return next(createError(401, "User signup failed , Please try again"))
        }
        await user.save()
        user.password = undefined
        const token = await user.generateToken()
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true
        })
        res.status(201).json({
            success: true,
            message: 'User created Successfully',
            user
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(createError(401, "All input feilds is required"))
        }
        const userData = await User.findOne({ email }).select('+password')
        if (!userData) {
            return next(createError(404, "User this email is not found"))
        }
        const comparePassword = await bcryptjs.compare(password, userData.password)
        if (!comparePassword) {
            return next(createError(401, "Invalid email or password"))
        }
        const token = await User.generateToken()
        userData.password = undefined
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true
        })
        res.status(200).json({
            success: true,
            message: `Welcome back ${userData.name}`,
            userData
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const logout = (req, res, next) => {
    try {
        res.cookie('token', null , {
            httpOnly:true,
            maxAge:0,
            secure:true
        })
        res.status(200).json({
            success:true,
            message:"User log out Successfully"
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const getProfile = async(req, res, next) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        res.status(200).json({
            success:true,
            message:'User details',
            user
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}