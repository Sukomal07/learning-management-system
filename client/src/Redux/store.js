import { configureStore } from '@reduxjs/toolkit'

import AuthSliceReducer from './slices/AuthSlice'
import CourseSliceReducer from './slices/CourseSlice'

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course: CourseSliceReducer
    },
    devTools: true
})


export default store