import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    lectures: []
}

const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: () => { }
})

export default lectureSlice.reducer