import { combineReducers } from 'redux'
import userRegistrationReducer from './reducer/userRegistrationReducer'
import themeReducer from './reducer/themeReducer'


// Combine Reducer - here we can add other reducers

export const appReducer = combineReducers({
  userRegistration: userRegistrationReducer,
  themeReducer
})
