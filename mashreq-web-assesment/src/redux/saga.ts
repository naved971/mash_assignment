import { all } from 'redux-saga/effects'
import { watchUserAuthenticationSaga } from './sagas/userAuthenticationSaga'

// Root Saga
export default function * (): any {
  yield all([
    watchUserAuthenticationSaga()
  ])
}
