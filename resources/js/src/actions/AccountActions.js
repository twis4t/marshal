import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_ACCOUNTS_REQUEST = 'GET_ACCOUNTS_REQUEST'
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
export const GET_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR'

export const getAccounts = () => async dispatch => {
  dispatch({
    type: GET_ACCOUNTS_REQUEST,
  })

  await axios
    .get('/users')
    .then(res => {
      dispatch({
        type: GET_ACCOUNTS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_ACCOUNTS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список учетных записей',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get accounts list failed', e)
    })
}
