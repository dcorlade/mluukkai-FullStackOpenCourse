import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'
import productsReducer from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'

const store = configureStore({
  reducer: {
    products: productsReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer,
    cart: cartReducer
  }
})

export default store
