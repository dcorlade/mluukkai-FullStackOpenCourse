import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return { message: '', type: '' }
    }
  }
})

export const { setNotification, removeNotification } = notificationReducer.actions

export const notify = (message, type, time) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export default notificationReducer.reducer
