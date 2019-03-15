import { createStore, compose, applyMiddleware } from 'redux'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { rootReducer } from '@/reducers'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

export const history = createHashHistory()

export default function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk /* logger */))
  )

  return store
}
