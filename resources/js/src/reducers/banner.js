import { GET_BANNERS_REQUEST, GET_BANNERS_SUCCESS, GET_BANNERS_ERROR } from '@/actions/BannerActions'

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

    default:
      return state
  }
}
