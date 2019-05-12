import { GET_STATISTIC_REQUEST, GET_STATISTIC_SUCCESS, GET_STATISTIC_ERROR } from '@/actions/StatisticActions'

const initialState = {
  statistic: {
    requestsStat: { dates: [0, 0], total: 0 },
    usersStat: { dates: [0, 0], total: 0 },
    answersStat: { dates: [0, 0], total: 0 },
    messagesStat: { dates: [0, 0], total: 0 },
  },
  isFetching: false,
}

export const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Получение */
    case GET_STATISTIC_REQUEST:
      return { ...state, isFetching: true }
    case GET_STATISTIC_SUCCESS:
      return { ...state, statistic: { ...action.payload }, isFetching: false }
    case GET_STATISTIC_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
