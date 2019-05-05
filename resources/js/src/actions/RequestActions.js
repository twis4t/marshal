import axios from '@/axios'
import moment from 'moment'
import { enqueueSnackbar } from './NotistackActions'

export const GET_REQUESTS_REQUEST = 'GET_REQUESTS_REQUEST'
export const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS'
export const GET_REQUESTS_ERROR = 'GET_REQUESTS_ERROR'

export const GET_REQUEST_STATUSES_REQUEST = 'GET_REQUEST_STATUSES_REQUEST'
export const GET_REQUEST_STATUSES_SUCCESS = 'GET_REQUEST_STATUSES_SUCCESS'
export const GET_REQUEST_STATUSES_ERROR = 'GET_REQUEST_STATUSES_ERROR'

export const getRequests = options => async dispatch => {
  options = options || {}
  const params = {
    shops: options.shops || [],
    users: options.users || [],
    statuses: options.statuses || [],
    dateFrom: options.dateFrom || moment().format('YYYY-MM-DD'),
    dateTo: options.dateTo || moment().format('YYYY-MM-DD'),
  }

  dispatch({
    type: GET_REQUESTS_REQUEST,
  })

  await axios
    .get('/requests', { params: params })
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

export const getRequestStatuses = () => async dispatch => {
  dispatch({
    type: GET_REQUEST_STATUSES_REQUEST,
  })

  await axios
    .get('/request-statuses')
    .then(res => {
      dispatch({
        type: GET_REQUEST_STATUSES_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_REQUEST_STATUSES_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить статусы заявок',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get request statuses failed', e)
    })
}
