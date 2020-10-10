import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export const GET_USER_DETAIL_SUCCESS = 'GET_USER_DETAIL_SUCCESS'
export const GET_USER_DETAIL_ERROR = 'GET_USER_DETAIL_ERROR'

export const USER_LOGOUT = 'USER_LOGOUT'

export const getUser = (email, password) => dispatch => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: {
      email: email,
      password: password,
    },
  })

  axios
    .post('/login', { email: email, password: password, application: 'marshal-back' })
    .then(login => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          ...login.data,
        },
      })
        console.log(login.data);
      axios.defaults.headers.common['Authorization'] = login.data.token_type + ' ' + login.data.access_token
      axios
        .get('/details')
        .then(details => {
          dispatch({
            type: GET_USER_DETAIL_SUCCESS,
            payload: {
              ...details.data.success,
              isAuth: true,
            },
          })
          const currentUserState = localStorage.getItem('user')
          localStorage.setItem('user', JSON.stringify({ ...currentUserState, ...login.data, ...details.data.success }))
        })
        .catch(e => {
          dispatch({
            type: GET_USER_DETAIL_ERROR,
          })
          dispatch(
            enqueueSnackbar({
              message: 'Не удалось получить данные пользователя',
              options: {
                variant: 'warning',
              },
            })
          )
          console.log('Get user detail failed', e)
        })
    })
    .catch(e => {
      dispatch({
        type: GET_USER_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось войти',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Authorization failed', e)
    })
}

export const logOut = () => dispatch => {
  localStorage.removeItem('user')
  dispatch({
    type: USER_LOGOUT,
    payload: {
      isAuth: false,
    },
  })
}
