import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST'
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS'
export const GET_ROLES_ERROR = 'GET_ROLES_ERROR'

export const getRoles = () => async dispatch => {
  dispatch({
    type: GET_ROLES_REQUEST,
  })

  await axios
    .get('/roles')
    .then(res => {
      dispatch({
        type: GET_ROLES_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_ROLES_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список ролей',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get roles data failed', e)
    })
}
