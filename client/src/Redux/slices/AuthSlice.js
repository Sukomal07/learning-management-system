import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}

export const signup = createAsyncThunk("/auth/signup", async (data) => {
    try {
        toast.loading("Wait! Creating your account");
        const response = await axiosInstance.post('/user/signup', data);
        toast.dismiss();
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
    }
});



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})



export default authSlice.reducer