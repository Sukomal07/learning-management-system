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
        toast.loading("Wait! Creating your account", {
            position: 'top-center'
        });
        const response = await axiosInstance.post('/user/signup', data);
        toast.dismiss();
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
    }
});
export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        toast.loading("Wait! login in your account", {
            position: 'top-center'
        });
        const response = await axiosInstance.post('/user/login', data);
        toast.dismiss();
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        toast.loading("Wait! logout in progress", {
            position: 'top-center'
        });
        const response = await axiosInstance.get('/user/login');
        toast.dismiss();
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("data", JSON.stringify(action?.payload?.userData));
            localStorage.setItem("role", action?.payload?.userData?.role);
            state.isLoggedIn = true
            state.data = JSON.stringify(action?.payload?.userData)
            state.role = action?.payload?.userData?.role
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true
            state.data = JSON.stringify(action?.payload?.user)
            state.role = action?.payload?.user?.role
        })
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = "";
        })
    }
})



export default authSlice.reducer