import { createContext, useContext, useReducer, useEffect } from 'react'
import loginService from '../services/login'

// Define reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

// Create context
const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  const login = async (username, password) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch({ type: 'SET_USER', payload: user })
    return user
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'CLEAR_USER' })
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  return useContext(UserContext)
}
