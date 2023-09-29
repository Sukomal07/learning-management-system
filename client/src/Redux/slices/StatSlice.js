import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import axiosInstanse from '../../helpers/AxiosInstance'

const initialState = {
    allUserCount: 0,
    subscribedCount: 0
}

export const getStats = createAsyncThunk("stats/get", async () => {
    try {
        toast.loading("Getting stats", {
            position: 'top-center'
        })
        const response = await axiosInstanse.get("/admin/stats/users")
        if (response.status === 200) {
            toast.dismiss();
            toast.success(response.data.message)
            return response.data
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message)
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error
    }
})
const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStats.fulfilled, (state, action) => {
            state.allUserCount = action.payload.allUserCount
            state.subscribedCount = action.payload.subscribedUser
        })
    }
})

export default statSlice.reducer;