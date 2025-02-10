import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await userService.login({
      username,
      password
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const { setUser, clearUser } = userReducer.actions

export default userReducer.reducer
