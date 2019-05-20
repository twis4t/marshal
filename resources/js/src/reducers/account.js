import {
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  USER_STATUS_REQUEST,
  USER_STATUS_SUCCESS,
  USER_STATUS_ERROR,
  AUTH_LOGS_REQUEST,
  AUTH_LOGS_SUCCESS,
  AUTH_LOGS_ERROR,
} from '@/actions/AccountActions'

const initialState = {
  accounts: [],
  authLogs: [],
  isLogFetching: false,
  isFetching: false,
}

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Список пользователей */
    case GET_ACCOUNTS_REQUEST:
      return { ...state, isFetching: true }
    case GET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.payload, isFetching: false }
    case GET_ACCOUNTS_ERROR:
      return { ...state, isFetching: false }
    /* Лог входа */
    case AUTH_LOGS_REQUEST:
      return { ...state, isLogFetching: true }
    case AUTH_LOGS_SUCCESS:
      return { ...state, authLogs: action.payload, isLogFetching: false }
    case AUTH_LOGS_ERROR:
      return { ...state, isLogFetching: false }
    /* Редактирование */
    case EDIT_USER_REQUEST:
      return { ...state, isFetching: true }
    case EDIT_USER_SUCCESS:
      return { ...state, isFetching: false }
    case EDIT_USER_ERROR:
      return { ...state, isFetching: false }
    /* Добавление */
    case ADD_USER_REQUEST:
      return { ...state, isFetching: true }
    case ADD_USER_SUCCESS:
      return { ...state, isFetching: false }
    case ADD_USER_ERROR:
      return { ...state, isFetching: false }
    /* Статус (бан) */
    case USER_STATUS_REQUEST:
      return { ...state, isFetching: true }
    case USER_STATUS_SUCCESS:
      return { ...state, isFetching: false }
    case USER_STATUS_ERROR:
      return { ...state, isFetching: false }
    default:
      return state
  }
}
