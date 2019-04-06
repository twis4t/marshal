import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
  REMOVE_CATEGORY_REQUEST,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_ERROR,
} from '@/actions/CategoryActions'

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

    /* Добавление */
    case ADD_CATEGORY_REQUEST:
      return { ...state, isFetching: true }
    case ADD_CATEGORY_SUCCESS: {
      let categories = [...state.categories, action.payload]
      return { ...state, categories: categories, isFetching: false }
    }
    case ADD_CATEGORY_ERROR:
      return { ...state, isFetching: false }

    /* Редактирование */
    case EDIT_CATEGORY_REQUEST:
      return { ...state, isFetching: true }
    case EDIT_CATEGORY_SUCCESS: {
      let categories = [...state.categories]
      let catIndex = categories.indexOf(categories.find(item => item.id === action.payload.id))
      if (catIndex > -1) {
        categories.splice(catIndex, 1, action.payload)
      }
      return { ...state, categories: categories, isFetching: false }
    }
    case EDIT_CATEGORY_ERROR:
      return { ...state, isFetching: false }

    /* Удаление */
    case REMOVE_CATEGORY_REQUEST:
      return { ...state, isFetching: true }
    case REMOVE_CATEGORY_SUCCESS: {
      let categories = [...state.categories.filter(item => item.id !== action.payload.id)]
      return { ...state, categories: categories, isFetching: false }
    }
    case REMOVE_CATEGORY_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
