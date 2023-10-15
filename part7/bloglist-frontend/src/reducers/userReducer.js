import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const { setUser } = userSlice.actions

export const userLogin = (username, password) => {
    try {
        return async (dispatch) => {
            const user = await loginService.login({ username, password })
            dispatch(setUser(user))
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
        }
    } catch (exception) {
        dispatch(setNotification('wrong username or password', 'error', 5))
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
        blogService.setToken(null)
    }
}

export default userSlice.reducer
