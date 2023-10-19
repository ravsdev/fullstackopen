import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userSlice from './reducers/userReducer'

export default configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
        user: loginReducer,
        users: userSlice,
    },
})
