import { GET_USER_REQUEST, GET_USER_SUCCESS } from '@/actions/UserActions'

const initialState = {
  name: 'guest',
  isAuth: false,
  isFetching: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, isFetching: true }
    case GET_USER_SUCCESS:
      return { ...state, ...action.payload, isFetching: false }

    default:
      return state
  }
}
