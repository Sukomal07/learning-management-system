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
        toast.error(error?.response?.data?.message);
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