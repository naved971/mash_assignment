import { takeLatest, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/userRegistrationActions'
import { Network, Endpoints } from '../../networking'
import axios from 'axios';
import { handleNetworkError } from '../../config/utils'

// watcher
export function * watchUserRegistrationSaga (): any {
  yield takeLatest(
    Actions.REGISTER_USER_REQUEST,
    registerUser
  )
}

export function *registerUser (action: any): any {
  try {
    const response = yield call(registerUserAPI, action)
    yield put(Actions.registerUserSuccess(response.data)) 
  } catch (error) {
    if(axios.isAxiosError(error)){ // this is manageable by interceptors
      const  errorMessage = handleNetworkError(error)
      yield put(Actions.registerUserFailure(errorMessage))

    } else{
      yield put(Actions.registerUserFailure("Network Error"))
    }
   
  }
}

export async function registerUserAPI (action: any): Promise<any> {
  const url = Endpoints.POST_REGISTER_USER
  const config: any = {
    method: 'POST',
    url,
    data: action.payload
  }
  return await Network.makeNetworkCall(config)
}
