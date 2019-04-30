import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_REQUESTS_REQUEST = 'GET_REQUESTS_REQUEST'
export const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS'
export const GET_REQUESTS_ERROR = 'GET_REQUESTS_ERROR'

export const getRequests = () => async dispatch => {
  dispatch({
    type: GET_REQUESTS_REQUEST,
  })

  await axios
    .get('/requests')
    .then(res => {
      dispatch({
        type: GET_REQUESTS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_REQUESTS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список заявок',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get request list failed', e)
    })
}
