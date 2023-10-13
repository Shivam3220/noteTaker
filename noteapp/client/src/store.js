import { configureStore } from '@reduxjs/toolkit'
import userLogged from './ReduxActions/UserLogged'

export default configureStore({
  reducer: {
    user:userLogged
  },
})