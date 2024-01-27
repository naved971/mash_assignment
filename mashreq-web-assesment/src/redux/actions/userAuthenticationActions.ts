export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_CLEAR = 'LOGIN_USER_CLEAR'


export const loginUserRequest = (payload: any): any => ({
  type: LOGIN_USER_REQUEST,
  payload
})


export const loginUserSuccess = (payload: any): any => ({
  type: LOGIN_USER_SUCCESS,
  payload
})


export const loginUserFailure = (payload: any): any => ({
  type: LOGIN_USER_FAILURE,
  payload
})

export const clearLoginUser = (): any => ({
  type: LOGIN_USER_CLEAR,
})

