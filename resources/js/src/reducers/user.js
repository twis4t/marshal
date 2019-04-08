import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_ERROR,
  USER_LOGOUT,
} from '@/actions/UserActions'

const initialState = {
  name: 'guest',
  isAuth: false,
  isFetching: false,
}

const lsUser = JSON.parse(localStorage.getItem('user')) || {}
lsUser.isAuth = lsUser.hasOwnProperty('access_token')
const resultState = { ...initialState, ...lsUser }

export const userReducer = (state = resultState, action) => {
  switch (action.type) {
    /* Авторизация */
    case GET_USER_REQUEST:
      return { ...state, isFetching: true }
    case GET_USER_SUCCESS:
      return { ...state, ...action.payload, isFetching: false }
    case GET_USER_ERROR:
      return { ...state, isFetching: false }

    /* Детали профиля */
    case GET_USER_DETAIL_SUCCESS:
      return { ...state, ...action.payload, isFetching: false }
    case GET_USER_DETAIL_ERROR:
      return { ...state, isFetching: false }

    /* Выход */
    case USER_LOGOUT:
      return { isFetching: false, isAuth: false }
    default:
      return state
  }
}
