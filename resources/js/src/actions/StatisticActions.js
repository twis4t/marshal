import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_STATISTIC_REQUEST = 'GET_STATISTIC_REQUEST'
export const GET_STATISTIC_SUCCESS = 'GET_STATISTIC_SUCCESS'
export const GET_STATISTIC_ERROR = 'GET_STATISTIC_ERROR'

export const GET_CATEGORIES_STAT_REQUEST = 'GET_CATEGORIES_STAT_REQUEST'
export const GET_CATEGORIES_STAT_SUCCESS = 'GET_CATEGORIES_STAT_SUCCESS'
export const GET_CATEGORIES_STAT_ERROR = 'GET_CATEGORIES_STAT_ERROR'

export const GET_STATUS_COUNT_REQUEST = 'GET_STATUS_COUNT_REQUEST'
export const GET_STATUS_COUNT_SUCCESS = 'GET_STATUS_COUNT_SUCCESS'
export const GET_STATUS_COUNT_ERROR = 'GET_STATUS_COUNT_ERROR'

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
          message: 'Не удалось получить общую статистику',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get statistic failed', e)
    })
}

export const getRequestCategoriesStat = () => async dispatch => {
  dispatch({
    type: GET_CATEGORIES_STAT_REQUEST,
  })

  await axios
    .get('/categories-stat')
    .then(res => {
      dispatch({
        type: GET_CATEGORIES_STAT_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_CATEGORIES_STAT_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить статистику по категориям',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get categories statistic failed', e)
    })
}

export const getRequestStatusesCount = () => async dispatch => {
  dispatch({
    type: GET_STATUS_COUNT_REQUEST,
  })

  await axios
    .get('/status-count')
    .then(res => {
      dispatch({
        type: GET_STATUS_COUNT_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_STATUS_COUNT_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить статистику по статусам',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get statuses statistic failed', e)
    })
}
