import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_CATEGORIES_REQUEST = 'GET_SHOPS_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_SHOPS_SUCCESS'
export const GET_CATEGORIES_ERROR = 'GET_SHOPS_ERROR'

export const getCategories = () => async dispatch => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
  })

  axios
    .get('/categories')
    .then(res => {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_CATEGORIES_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список категорий',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get categories data failed', e)
    })
}
