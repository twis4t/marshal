import {
  GET_SHOPS_REQUEST,
  GET_SHOPS_SUCCESS,
  GET_SHOPS_ERROR,
  EDIT_SHOP_REQUEST,
  EDIT_SHOP_SUCCESS,
  EDIT_SHOP_ERROR,
} from '@/actions/ShopActions'

const initialState = {
  shops: [],
  isFetching: false,
}

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOPS_REQUEST:
      return { ...state, isFetching: true }
    case GET_SHOPS_SUCCESS:
      return { ...state, shops: [...action.payload], isFetching: false }
    case GET_SHOPS_ERROR:
      return { ...state, isFetching: false }
    case EDIT_SHOP_REQUEST:
      return { ...state, isFetching: true }
    case EDIT_SHOP_SUCCESS:
      return { ...state, isFetching: false }
    case EDIT_SHOP_ERROR:
      return { ...state, isFetching: false }
    default:
      return state
  }
}
