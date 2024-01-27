import { take, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/userAuthenticationActions'
import { Network, Endpoints } from '../../networking'
import axios from 'axios';
import { handleAxiosErrorMessage } from '../../config/utils'

// watcher
export function *watchUserAuthenticationSaga (): any {
  const action = yield take(Actions.LOGIN_USER_REQUEST,)
  yield call(loginUser, action)

}

export function *loginUser (action: any): any {
  try {
    const response = yield call(loginUserAPI, action)
    yield put(Actions.loginUserSuccess(response.data)) 
  } catch (error) {
    if(axios.isAxiosError(error)){ // this is manageable by interceptors
      const  errorMessage = handleAxiosErrorMessage(error)
      yield put(Actions.loginUserFailure(errorMessage))

    } else{
      yield put(Actions.loginUserFailure("Network Error"))
    }
  }
}

export async function loginUserAPI (action: any): Promise<any> {
  const url = Endpoints.POST_LOGIN_USER
  const config: any = {
    method: 'POST',
    url,
    data: action.payload
  }
  return await Network.makeNetworkCall(config)
}
