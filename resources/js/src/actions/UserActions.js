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
    localStorage.setItem(
      'user',
      JSON.stringify({ token: 'sdfg345g43wrtg', name: 'Test User Name', email: 'test@test.et' })
    )
  }, 2000)
}
