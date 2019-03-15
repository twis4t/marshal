import { push } from 'connected-react-router'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

export const getUser = (email, password) => dispatch => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: {
      email: email,
      password: password,
    },
  })
  setTimeout(() => {
    console.log('get user by mail - ' + email)
    dispatch({
      type: GET_USER_SUCCESS,
      payload: {
        isAuth: true,
        name: 'test',
      },
    })

    dispatch(push('/'))
  }, 2000)
}
