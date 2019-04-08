import { GET_ACCOUNTS_REQUEST, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR } from '@/actions/AccountActions'

const initialState = {
  accounts: [],
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

    default:
      return state
  }
}
