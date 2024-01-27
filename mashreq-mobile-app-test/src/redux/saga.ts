import { all } from 'redux-saga/effects'
import { watchUserRegistrationSaga } from './sagas/userRegistrationSaga'

// Root Saga
export default function * (): any {
  yield all([
    watchUserRegistrationSaga()
  ])
}
