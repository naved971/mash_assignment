import userAuthenticationReducer from '../userAuthenticationReducer';
import * as Actions from '../../actions/userAuthenticationActions';

describe('userAuthenticationReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      error: null,
      response: null,
      accessToken : null
    };
    const state = userAuthenticationReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    const initialState = {
      loading: false,
      error: null,
      response: null,
      accessToken : null
    };
    const action = Actions.loginUserRequest({
        username: "abcdef",
        password: 'AB2334WE@',
    });
    const state = userAuthenticationReducer(initialState, action);
    const expectedState = {
      loading: true,
      error: null,
      response: null,
      accessToken : null
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    const initialState = {
      loading: true,
      error: null,
      response: null,
      accessToken : null
    };

    const response = {
        status: 200,
        data : {
          accessToken : 'exampleToken'
        }
    };
    const action = Actions.loginUserSuccess(response);
    const state = userAuthenticationReducer(initialState, action);
    const expectedState = {
      loading: false,
      error: null,
      response
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_FAILURE', () => {
    const initialState = {
      loading: true,
      error: null,
      response: null,
      accessToken : null
    };
    const action = Actions.loginUserFailure('Error message');
    const state = userAuthenticationReducer(initialState, action);
    const expectedState = {
      loading: false,
      error: 'Error message',
      response: null,
      accessToken : null
    };
    expect(state).toEqual(expectedState);
  });
});
