import Course from '../models/courseModel.js';
import createError from '../utils/error.js'
import { v2 } from 'cloudinary'
import fs from 'fs/promises'
import { myCache } from '../app.js';

export const getAllCourses = async (req, res, next) => {
    try {
        let courses;
        if (myCache.has("courses")) {
            courses = JSON.parse(myCache.get("courses"))
        } else {
            courses = await Course.find({}).select('-lectures');
            if (!courses) {
                return next(createError(404, "No courses found"))
            }
            myCache.set("courses", JSON.stringify(courses))
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

export const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body
        if (!title || !description || !category || !createdBy) {
            return next(createError(400, "Please enter all input fields"))
        }
        const newCourse = new Course({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: title,
                secure_url: "http"
            }
        })

        try {
            await newCourse.validate();
        } catch (error) {
            const validationErrors = [];
            for (const key in error.errors) {
                validationErrors.push(error.errors[key].message);
            }
            return res.status(400).json({ success: false, message: validationErrors.join(', ') });
        }


        if (!newCourse) {
            return next(createError(400, "course created failed"))
        }
        if (req.file) {
            try {
                const result = await v2.uploader.upload(req.file.path, {
                    resource_type: 'image',
                    folder: 'lms'
                })
                if (result) {
                    newCourse.thumbnail.public_id = result.public_id
                    newCourse.thumbnail.secure_url = result.secure_url
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(createError(500, error.message || "file upload failed"));
            }
        }
        await newCourse.save()
        myCache.del("courses")
        res.status(201).json({
            success: true,
            message: "course created successfully",
            newCourse
        })
    } catch (error) {
        return next(createError(500, error.message));
    }
}

export const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            }
        )
        if (req.file) {
            try {
                await v2.uploader.destroy(course.thumbnail.public_id, {
                    resource_type: 'image'
                })
                const result = await v2.uploader.upload(req.file.path, {
                    resource_type: 'image',
                    folder: 'lms'
                })
                if (result) {
                    course.thumbnail.public_id = result.public_id
                    course.thumbnail.secure_url = result.secure_url
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(createError(500, error.message || "file upload failed"));
            }
        }
        if (!course) {
            return next(createError(404, "No courses found"))
        }
        await course.save()
        myCache.del("courses")
        res.status(200).json({
            success: true,
            message: "course updated successfully",
            course
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const course = await Course.findByIdAndDelete(id)
        if (!course) {
            return next(createError(404, "No courses found"))
        }
        await v2.uploader.destroy(course.thumbnail.public_id, {
            resource_type: 'image'
        })
        myCache.del("courses")
        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const getLectures = async (req, res, next) => {
    try {
        const { id } = req.params;
        let lectures;
        if (myCache.has("lectures")) {
            lectures = JSON.parse(myCache.get("lectures"));
        } else {
            const course = await Course.findById(id);
            if (!course) {
                return next(createError(404, "No courses found"));
            }
            lectures = course.lectures
            myCache.set("lectures", JSON.stringify(lectures));
        }
        return res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            lectures
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};


export const addLecturesToCourse = async (req, res, next) => {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            return next(createError(400, "Please enter all input fields"))
        }
        const { id } = req.params
        const course = await Course.findById(id)
        if (!course) {
            return next(createError(404, "No course found"))
        }
        const lectureData = {
            title,
            description,
            lecture: {
                public_id: title,
                secure_url: "http"
            }
        }
        if (req.file) {
            try {
                const result = await v2.uploader.upload(req.file.path, {
                    resource_type: 'video',
                    folder: 'lms'
                })
                if (result) {
                    lectureData.lecture.public_id = result.public_id
                    lectureData.lecture.secure_url = result.secure_url

                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(createError(500, error.message || "file upload failed"))
            }
        }

        course.lectures.push(lectureData)
        course.numberOfLectures = course.lectures.length
        await course.save()
        myCache.del("lectures")
        res.status(200).json({
            success: true,
            message: "lectures add successfully",
            lectures: course.lectures
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const updateLectures = async (req, res, next) => {
    try {
        const { id, lectureId } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return next(createError(404, "No course found"));
        }

        const lectureToUpdate = course.lectures.find((lecture) => lecture._id.toString() === lectureId.toString());
        if (!lectureToUpdate) {
            return next(createError(404, "No lecture found"));
        }

        if (req.body.title) {
            lectureToUpdate.title = req.body.title;
        }
        if (req.body.description) {
            lectureToUpdate.description = req.body.description;
        }
        if (req.file) {
            try {
                await v2.uploader.destroy(
                    lectureToUpdate.lecture.public_id,
                    {
                        resource_type: 'video'
                    }
                )
                const result = await v2.uploader.upload(req.file.path, {
                    resource_type: 'video',
                    folder: 'lms'
                })
                if (result) {
                    lectureToUpdate.lecture.public_id = result.public_id
                    lectureToUpdate.lecture.secure_url = result.secure_url

                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(createError(500, error.message || "file upload failed"))
            }
        }
        await course.save();
        myCache.del("lectures");
        res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            course: course.lectures,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

export const deleteLectures = async (req, res, next) => {
    try {
        const { id, lectureId } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return next(createError(404, "No course found"));
        }

        const lectureIndex = course.lectures.findIndex((lecture) => lecture._id.toString() === lectureId.toString());
        if (lectureIndex === -1) {
            return next(createError(404, "No lecture found"));
        }
        await v2.uploader.destroy(
            course.lectures[lectureIndex].lecture.public_id,
            {
                resource_type: 'video'
            }
        )

        course.lectures.splice(lectureIndex, 1);
        course.numberOfLectures = course.lectures.length;

        await course.save();
        myCache.del("lectures");
        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            lectures: course.lectures
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};
