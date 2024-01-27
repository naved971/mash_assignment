export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_CLEAR = 'REGISTER_USER_CLEAR'


export const registerUserRequest = (payload: any): any => ({
  type: REGISTER_USER_REQUEST,
  payload
})


export const registerUserSuccess = (payload: any): any => ({
  type: REGISTER_USER_SUCCESS,
  payload
})


export const registerUserFailure = (payload: any): any => ({
  type: REGISTER_USER_FAILURE,
  payload
})

export const clearRegisterUser = (): any => ({
  type: REGISTER_USER_CLEAR,
})

