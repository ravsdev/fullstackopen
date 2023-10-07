import { createSlice } from "@reduxjs/toolkit"
/*
export const setFilter = (text) =>{
    return {
        type: 'CHANGE',
        payload: {
            text
        }
    }
}

const filterReducer = (state = '', action)=>{
    //console.log(action)
    switch(action.type){
        case 'CHANGE':
            return action.payload.text.trim()
        default:
            return state
    }
}
*/

const filterSlice=createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, action){
            //console.log(action)
            return action.payload.trim()
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer