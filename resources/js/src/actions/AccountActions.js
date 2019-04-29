import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_ACCOUNTS_REQUEST = 'GET_ACCOUNTS_REQUEST'
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
export const GET_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR'

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST'
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS'
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR'

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const ADD_USER_ERROR = 'ADD_USER_ERROR'

export const USER_STATUS_REQUEST = 'USER_STATUS_REQUEST'
export const USER_STATUS_SUCCESS = 'USER_STATUS_SUCCESS'
export const USER_STATUS_ERROR = 'USER_STATUS_ERROR'

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

export const editUser = (id, data) => async dispatch => {
  dispatch({
    type: EDIT_USER_REQUEST,
  })

  const fields = {
    name: data.name,
    email: data.email,
    password: data.password,
    role_id: data.role_id,
    shop_id: data.shop_id,
  }

  await axios
    .put('/user-update/' + id, fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: EDIT_USER_SUCCESS,
        })
        dispatch(
          enqueueSnackbar({
            message: 'Изменения сохранены',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: EDIT_USER_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: EDIT_USER_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось сохранить изменения',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Edit user data failed', e)
    })
}

export const addUser = data => async dispatch => {
  dispatch({
    type: ADD_USER_REQUEST,
  })

  const fields = {
    name: data.name,
    email: data.email,
    password: data.password,
    c_password: data.password,
    role_id: data.role_id,
    shop_id: data.shop_id,
  }

  await axios
    .post('/register', fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: {},
        })
        dispatch(
          enqueueSnackbar({
            message: 'Пользователь добавлен',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: ADD_USER_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: ADD_USER_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось добавить пользователя',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Add user failed', e)
    })
}

export const setStatus = (id, date) => async dispatch => {
  dispatch({
    type: USER_STATUS_REQUEST,
  })

  await axios
    .put('/user-update/' + id, { banned_date: date })
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: USER_STATUS_SUCCESS,
        })
        dispatch(
          enqueueSnackbar({
            message: 'Статус пользователя изменен',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: USER_STATUS_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: USER_STATUS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось изменить статус пользователя',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('User status change failed', e)
    })
}
