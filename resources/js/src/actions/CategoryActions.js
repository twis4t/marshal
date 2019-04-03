import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR'

export const getCategories = () => async dispatch => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
  })

  await axios
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
