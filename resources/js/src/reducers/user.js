import { SET_NAME, GET_USER_REQUEST, GET_USER_RESULT } from '@/actions/UserActions'

const initialState = {
  name: 'guest',
  isFetching: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload }
    case GET_USER_REQUEST:
      return { ...state, isFetching: true }
    case GET_USER_RESULT:
      return { ...state, ...action.payload, isFetching: false }

    default:
      return state
  }
}
