import { GET_REQUESTS_REQUEST, GET_REQUESTS_SUCCESS, GET_REQUESTS_ERROR } from '@/actions/RequestActions'

const initialState = {
  requests: [],
  isFetching: false,
}

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Список заявок */
    case GET_REQUESTS_REQUEST:
      return { ...state, isFetching: true }
    case GET_REQUESTS_SUCCESS:
      return { ...state, requests: action.payload, isFetching: false }
    case GET_REQUESTS_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}