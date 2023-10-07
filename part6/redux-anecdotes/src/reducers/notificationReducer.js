import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers:{
        showNotification(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return null
        }
    }
})

export const {showNotification, removeNotification} = notificationSlice.actions

export const setNotification= (text,time)=>{
    return async dispatch=>{
        dispatch(showNotification(text))
        setTimeout(()=>dispatch(removeNotification()),time*1000)
    }
}

export default notificationSlice.reducer

