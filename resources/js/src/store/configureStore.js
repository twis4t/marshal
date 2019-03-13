import { createStore, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { rootReducer } from '@/reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), thunk, logger))
  )

  return store
}
