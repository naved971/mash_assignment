import { combineReducers } from 'redux'
import userAuthenticationReducer from './reducer/userAuthenticationReducer'

// Combine Reducer - here we can add other reducers

export const appReducer = combineReducers({
  userAuthentication: userAuthenticationReducer,
})
