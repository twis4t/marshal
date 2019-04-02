import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { userReducer } from './user'
import { settingsReducer } from './settings'
import { shopReducer } from './shop'
import { categoryReducer } from './category'
import { notistackReducer } from './notistack'

export const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    shop: shopReducer,
    category: categoryReducer,
    settings: settingsReducer,
    notistack: notistackReducer,
  })
