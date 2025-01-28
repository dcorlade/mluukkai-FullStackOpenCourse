import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
    name:"notification",
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationReducer.actions

export const notify = (message, time) => {
    return async (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() => {dispatch(removeNotification())}, time)
    }
}

export default notificationReducer.reducer