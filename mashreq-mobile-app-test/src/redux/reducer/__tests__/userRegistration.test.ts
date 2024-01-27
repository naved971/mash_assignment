import userRegistrationReducer from '../userRegistrationReducer';
import * as Actions from '../../actions/userRegistrationActions';

describe('userRegistrationReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      error: null,
      response: null,
      accessToken : null
    };
    const state = userRegistrationReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle REGISTER_USER_REQUEST', () => {
    const initialState = {
      loading: false,
      error: null,
      response: null,
      accessToken : null
    };
    const action = Actions.registerUserRequest({
        username: "abcdef",
        password: 'AB2334WE@',
        firstName: "Naved",
        lastName: 'khan'
    });
    const state = userRegistrationReducer(initialState, action);
    const expectedState = {
      loading: true,
      error: null,
      response: null,
      accessToken : null
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_SUCCESS', () => {
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
    const action = Actions.registerUserSuccess(response);
    const state = userRegistrationReducer(initialState, action);
    const expectedState = {
      loading: false,
      error: null,
      response
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_FAILURE', () => {
    const initialState = {
      loading: true,
      error: null,
      response: null,
      accessToken : null
    };
    const action = Actions.registerUserFailure('Error message');
    const state = userRegistrationReducer(initialState, action);
    const expectedState = {
      loading: false,
      error: 'Error message',
      response: null,
      accessToken : null
    };
    expect(state).toEqual(expectedState);
  });
});