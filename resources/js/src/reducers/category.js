import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR } from '@/actions/CategoryActions'

const initialState = {
  categories: [],
  isFetching: false,
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Получение */
    case GET_CATEGORIES_REQUEST:
      return { ...state, isFetching: true }
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: [...action.payload], isFetching: false }
    case GET_CATEGORIES_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
