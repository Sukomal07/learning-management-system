import Course from '../models/courseModel.js';
import createError from '../utils/error.js'
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');
        if (!courses) {
            return next(createError(404, "No courses found"))
        }
        res.status(200).json({
            success: true,
            message: "All courses",
            courses
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const getLectures = async (req, res, next) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id)
        if (!course) {
            return next(createError(404, "No courses found"))
        }
        res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            lectures: course.lectures
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const createCourse = async (req, res, next) => {

}

export const updateCourse = async (req, res, next) => {

}

export const deleteCourse = async (req, res, next) => {

}