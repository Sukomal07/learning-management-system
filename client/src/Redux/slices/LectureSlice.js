import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify'

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    lectures: []
}

export const getLectures = createAsyncThunk("/course/lecture", async (cid) => {
    try {
        toast.loading("Wait! fetching lectures", {
            position: 'top-center'
        })
        const response = await axiosInstance.get(`/course/${cid}`);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message);
            return response?.data
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message)
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const addLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        toast.loading("Wait! adding lecture", {
            position: 'top-center'
        })
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description)
        const response = await axiosInstance.post(`/course/${data.cid}`, formData);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message);
            return response?.data
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message)
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const updateLecture = createAsyncThunk("/course/lecture/update", async (data) => {
    try {
        toast.loading("Wait! updating lecture", {
            position: 'top-center'
        })
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description)
        const response = await axiosInstance.put(`/course/lectures/${data.cid}/${data.lectureId}`, formData);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message);
            return response?.data
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message)
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const deleteLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {
        toast.loading("Wait! deleting lecture", {
            position: 'top-center'
        })
        const response = await axiosInstance.delete(`/course/lectures/${data.cid}/${data.lectureId}`);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message);
            return response?.data
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message)
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLectures.fulfilled, (state, action) => {
            state.lectures = action.payload?.lectures
        })
        builder.addCase(addLecture.fulfilled, (state, action) => {
            state.lectures = action.payload?.lectures
        })
        builder.addCase(updateLecture.fulfilled, (state, action) => {
            state.lectures = action.payload?.lectures
        })
        builder.addCase(deleteLecture.fulfilled, (state, action) => {
            state.lectures = action.payload?.lectures
        })
    }
})

export default lectureSlice.reducer