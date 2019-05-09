import {
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  GET_REQUEST_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_ERROR,
  GET_REQUEST_STATUSES_REQUEST,
  GET_REQUEST_STATUSES_SUCCESS,
  GET_REQUEST_STATUSES_ERROR,
} from '@/actions/RequestActions'

const initialState = {
  requests: [],
  currentRequest: {
    status: {},
    category: {},
    user: {},
  },
  requestStatuses: [],
  isSingleFetching: false,
  isFetching: false,
  errorCode: 0,
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
    /* Получение заявки */
    case GET_REQUEST_REQUEST:
      return { ...state, errorCode: 0, isSingleFetching: true }
    case GET_REQUEST_SUCCESS:
      return { ...state, currentRequest: action.payload, isSingleFetching: false }
    case GET_REQUEST_ERROR:
      return { ...state, errorCode: action.payload, isSingleFetching: false }
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
