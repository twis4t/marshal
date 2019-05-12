import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_STATISTIC_REQUEST = 'GET_STATISTIC_REQUEST'
export const GET_STATISTIC_SUCCESS = 'GET_STATISTIC_SUCCESS'
export const GET_STATISTIC_ERROR = 'GET_STATISTIC_ERROR'

export const getStatistic = () => async dispatch => {
  dispatch({
    type: GET_STATISTIC_REQUEST,
  })

  await axios
    .get('/statistic')
    .then(res => {
      dispatch({
        type: GET_STATISTIC_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_STATISTIC_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить статистику',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get statistic failed', e)
    })
}
