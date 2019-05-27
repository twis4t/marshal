import {
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_ERROR,
  UPLOAD_BANNERS_REQUEST,
  UPLOAD_BANNERS_SUCCESS,
  UPLOAD_BANNERS_ERROR,
  REMOVE_BANNER_REQUEST,
  REMOVE_BANNER_SUCCESS,
  REMOVE_BANNER_ERROR,
} from '@/actions/BannerActions'

const initialState = {
  banners: [],
  isFetching: false,
}

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Получение */
    case GET_BANNERS_REQUEST:
      return { ...state, isFetching: true }
    case GET_BANNERS_SUCCESS:
      return { ...state, banners: [...action.payload], isFetching: false }
    case GET_BANNERS_ERROR:
      return { ...state, isFetching: false }
    /* Добавление */
    case UPLOAD_BANNERS_REQUEST:
      return { ...state, isFetching: true }
    case UPLOAD_BANNERS_SUCCESS:
      return { ...state, isFetching: false }
    case UPLOAD_BANNERS_ERROR:
      return { ...state, isFetching: false }
    /* Удаление */
    case REMOVE_BANNER_REQUEST:
      return { ...state, isFetching: true }
    case REMOVE_BANNER_SUCCESS:
      return { ...state, isFetching: false }
    case REMOVE_BANNER_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
