import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  console.log('initialise all users')
  return async (dispatch) => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersReducer.actions

export default usersReducer.reducer
