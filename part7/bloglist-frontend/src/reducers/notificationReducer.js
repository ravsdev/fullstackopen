import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },

        removeNotification(state, action) {
            return null
        },
    },
})

export const { showNotification, removeNotification } =
    notificationSlice.actions

export const setNotification = (text, style, time) => {
    return async (dispatch) => {
        dispatch(showNotification({ text, style, time }))
        setTimeout(() => dispatch(removeNotification()), time * 1000)
    }
}

export default notificationSlice.reducer
