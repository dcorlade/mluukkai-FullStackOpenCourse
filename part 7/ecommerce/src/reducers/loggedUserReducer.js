import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'

const userReducer = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
    clearLoggedUser() {
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
    dispatch(setLoggedUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearLoggedUser())
  }
}

export const initializeLoggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
    }
  }
}

export const { setLoggedUser, clearLoggedUser } = userReducer.actions

export default userReducer.reducer
