import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import axiosInstance from '../../helpers/AxiosInstance'


const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getRazorpayKey = createAsyncThunk("/razorpay/getKey", async () => {
    try {
        const response = await axiosInstance.get('/payments/key');
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = await axiosInstance.post('/payments/subscribe')
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error
    }
})
export const verifyUserPayment = createAsyncThunk("/verifyPayment", async (data) => {
    try {
        const response = await axiosInstance.post('/payments/verify', data)
        return response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error
    }
})

export const getPaymentsRecord = createAsyncThunk("/paymentsRecord", async () => {
    try {
        toast.loading("Getting payments record", {
            position: 'top-center'
        })
        const response = await axiosInstance.get("/payments?count=100")
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
        toast.error(error?.response?.data?.message)
        throw error
    }
})
export const cancelSubscription = createAsyncThunk("/cancel/subscribtion", async () => {
    try {
        toast.loading("wait! Cancel subscribtion...", {
            position: 'top-center'
        })
        const response = await axiosInstance.post("/payments/unsubscribe")
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
        toast.error(error?.response?.data?.message)
        throw error
    }
})


const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRazorpayKey.rejected, () => {
            toast.error("Failed to get razorpay id")
        })
        builder.addCase(getRazorpayKey.fulfilled, (state, action) => {
            state.key = action?.payload?.key
        })
        builder.addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id
        })
        builder.addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success
        })
        builder.addCase(verifyUserPayment.rejected, (state, action) => {
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        builder.addCase(getPaymentsRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments
            state.finalMonths = action?.payload?.finalMonths
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        })
    }
})

export default razorpaySlice.reducer