import * as Actions from '../actions/userAuthenticationActions'

const initialState = {
  loading: false,
  error: null,
  response: null,
  accessToken: null
}

const userAuthenticationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        response: null
      };
    case Actions.LOGIN_USER_SUCCESS:
      const { data } = action.payload;
      const { token } = data;
      return {
        ...state,
        loading: false,
        response: action.payload,
        accessToken: token // this can manage in interceptor
      };
    case Actions.LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case Actions.LOGIN_USER_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default userAuthenticationReducer
