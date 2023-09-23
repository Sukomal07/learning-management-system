import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    courseData: []
}

export const getAllCourse = createAsyncThunk('/course/get', async () => {
    try {
        toast.loading("loading course data...", {
            position: 'top-center'
        })
        const response = await axiosInstance.get('/course')
        toast.dismiss()
        toast.success(response.data.message)
        return response.data?.courses
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.statusText);
        throw error;
    }
})

export const createCourse = createAsyncThunk('/course/create', async (data) => {
    try {
        toast.loading("wait! creating course...", {
            position: 'top-center'
        })
        const response = await axiosInstance.post('/course/newcourse', data);
        if (response.status === 201) {
            toast.dismiss();
            toast.success(response.data.message);
            return response.data;
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const updateCourse = createAsyncThunk('/course/update', async (data) => {
    try {
        toast.loading("wait! updating course...", {
            position: 'top-center'
        })
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("createdBy", data.createdBy);
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }
        const response = await axiosInstance.put(`/course/${data.id}`, formData);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message);
            return response.data;
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const deleteCourse = createAsyncThunk('/course/delete', async (id) => {
    try {
        toast.loading("wait! deleting course...", {
            position: 'top-center'
        })
        const response = await axiosInstance.delete(`/course/${id}`);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message);
            return response.data;
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourse.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer