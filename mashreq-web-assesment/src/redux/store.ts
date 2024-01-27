import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { appReducer } from './appReducer'

const sagaMiddleware = createSagaMiddleware()

export type RootState = ReturnType<typeof appReducer>
export type AppStore = ReturnType<typeof setupStore>

// Redux Store -  getDefaultMiddleware  is added newly by the library
export const setupStore = (preloadedState?: Partial<RootState>): any => {
  const store = configureStore({
    reducer: appReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    devTools : true
  });

  // Run the rootSaga
  sagaMiddleware.run(rootSaga);

  return store;
};


const store: AppStore = setupStore()
export default store;