import {
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  GET_REQUEST_STATUSES_REQUEST,
  GET_REQUEST_STATUSES_SUCCESS,
  GET_REQUEST_STATUSES_ERROR,
} from '@/actions/RequestActions'

const initialState = {
  requests: [],
  requestStatuses: [],
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
    /* Список заявок */
    case GET_REQUEST_STATUSES_REQUEST:
      return { ...state, isFetching: true }
    case GET_REQUEST_STATUSES_SUCCESS:
      return { ...state, requestStatuses: action.payload, isFetching: false }
    case GET_REQUEST_STATUSES_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
