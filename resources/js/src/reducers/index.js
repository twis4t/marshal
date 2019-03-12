import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { userReducer } from './user'
import { settingsReducer } from './settings'

export const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    settings: settingsReducer,
  })
