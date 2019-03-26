import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_SHOPS_REQUEST = 'GET_SHOPS_REQUEST'
export const GET_SHOPS_SUCCESS = 'GET_SHOPS_SUCCESS'
export const GET_SHOPS_ERROR = 'GET_SHOPS_ERROR'

export const EDIT_SHOPS_REQUEST = 'EDIT_SHOPS_REQUEST'
export const EDIT_SHOPS_SUCCESS = 'EDIT_SHOPS_SUCCESS'
export const EDIT_SHOPS_ERROR = 'EDIT_SHOPS_ERROR'

export const getShops = () => dispatch => {
  dispatch({
    type: GET_SHOPS_REQUEST,
  })

  axios
    .get('/shops')
    .then(res => {
      dispatch({
        type: GET_SHOPS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_SHOPS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список магазинов',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get shops data failed', e)
    })
}
