import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_BANNERS_REQUEST = 'GET_BANNSERS_REQUEST'
export const GET_BANNERS_SUCCESS = 'GET_BANNSERS_SUCCESS'
export const GET_BANNERS_ERROR = 'GET_BANNSERS_ERROR'

export const getBanners = () => async dispatch => {
  dispatch({
    type: GET_BANNERS_REQUEST,
  })

  await axios
    .get('/categories')
    .then(res => {
      dispatch({
        type: GET_BANNERS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_BANNERS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список баннеров',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get banners list failed', e)
    })
}
