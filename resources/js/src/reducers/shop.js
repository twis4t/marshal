import {
  GET_SHOPS_REQUEST,
  GET_SHOPS_SUCCESS,
  GET_SHOPS_ERROR,
  EDIT_SHOP_REQUEST,
  EDIT_SHOP_SUCCESS,
  EDIT_SHOP_ERROR,
  ADD_SHOP_REQUEST,
  ADD_SHOP_SUCCESS,
  ADD_SHOP_ERROR,
  ARCHIVE_SHOP_REQUEST,
  ARCHIVE_SHOP_SUCCESS,
  ARCHIVE_SHOP_ERROR,
  SET_CATEGORIES_SHOP_REQUEST,
  SET_CATEGORIES_SHOP_SUCCESS,
  SET_CATEGORIES_SHOP_ERROR,
  GET_SHOP_STAFF_REQUEST,
  GET_SHOP_STAFF_SUCCESS,
  GET_SHOP_STAFF_ERROR,
} from '@/actions/ShopActions'

const initialState = {
  shops: [],
  currentShopStaff: [],
  isFetching: false,
  insertedId: 0,
}

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Получение */
    case GET_SHOPS_REQUEST:
      return { ...state, isFetching: true }
    case GET_SHOPS_SUCCESS:
      return { ...state, shops: [...action.payload], isFetching: false }
    case GET_SHOPS_ERROR:
      return { ...state, isFetching: false }
    /* Редактирование */
    case EDIT_SHOP_REQUEST:
      return { ...state, isFetching: true }
    case EDIT_SHOP_SUCCESS:
      return { ...state, isFetching: false }
    case EDIT_SHOP_ERROR:
      return { ...state, isFetching: false }
    /* Добавление */
    case ADD_SHOP_REQUEST:
      return { ...state, isFetching: true, insertedId: 0 }
    case ADD_SHOP_SUCCESS:
      return { ...state, isFetching: false, insertedId: action.payload.insertedId }
    case ADD_SHOP_ERROR:
      return { ...state, isFetching: false }
    /* Вывод в архив */
    case ARCHIVE_SHOP_REQUEST:
      return { ...state, isFetching: true }
    case ARCHIVE_SHOP_SUCCESS:
      return { ...state, isFetching: false }
    case ARCHIVE_SHOP_ERROR:
      return { ...state, isFetching: false }
    /* Установка категорий */
    case SET_CATEGORIES_SHOP_REQUEST:
      return { ...state, isFetching: true }
    case SET_CATEGORIES_SHOP_SUCCESS:
      return { ...state, isFetching: false }
    case SET_CATEGORIES_SHOP_ERROR:
      return { ...state, isFetching: false }
    /* Получение списка сотрудников магазина */
    case GET_SHOP_STAFF_REQUEST:
      return { ...state, isFetching: true }
    case GET_SHOP_STAFF_SUCCESS:
      return { ...state, currentShopStaff: action.payload, isFetching: false }
    case GET_SHOP_STAFF_ERROR:
      return { ...state, isFetching: false }
    default:
      return state
  }
}
