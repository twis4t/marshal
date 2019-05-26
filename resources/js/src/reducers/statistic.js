import {
  GET_STATISTIC_REQUEST,
  GET_STATISTIC_SUCCESS,
  GET_STATISTIC_ERROR,
  GET_CATEGORIES_STAT_REQUEST,
  GET_CATEGORIES_STAT_SUCCESS,
  GET_CATEGORIES_STAT_ERROR,
  GET_STATUS_COUNT_REQUEST,
  GET_STATUS_COUNT_SUCCESS,
  GET_STATUS_COUNT_ERROR,
} from '@/actions/StatisticActions'

const initialState = {
  statistic: {
    requestsStat: { dates: [0, 0], total: 0 },
    usersStat: { dates: [0, 0], total: 0 },
    answersStat: { dates: [0, 0], total: 0 },
    messagesStat: { dates: [0, 0], total: 0 },
    carsStat: { total: 0 },
    complaintsStat: { open: 0, total: 0 },
  },
  categoriesStat: [],
  statusesStat: [],
  isStatusesFetching: false,
  isCatFetching: false,
  isFetching: false,
}

export const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Общая */
    case GET_STATISTIC_REQUEST:
      return { ...state, isFetching: true }
    case GET_STATISTIC_SUCCESS:
      return { ...state, statistic: { ...action.payload }, isFetching: false }
    case GET_STATISTIC_ERROR:
      return { ...state, isFetching: false }
    /* По категориям заявок */
    case GET_CATEGORIES_STAT_REQUEST:
      return { ...state, isCatFetching: true }
    case GET_CATEGORIES_STAT_SUCCESS:
      return { ...state, categoriesStat: [...action.payload], isCatFetching: false }
    case GET_CATEGORIES_STAT_ERROR:
      return { ...state, isCatFetching: false }
    /* По статусам заявок */
    case GET_STATUS_COUNT_REQUEST:
      return { ...state, isStatusesFetching: true }
    case GET_STATUS_COUNT_SUCCESS:
      return { ...state, statusesStat: [...action.payload], isStatusesFetching: false }
    case GET_STATUS_COUNT_ERROR:
      return { ...state, isStatusesFetching: false }

    default:
      return state
  }
}
