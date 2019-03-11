export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_RESULT = 'GET_USER_RESULT'
export const SET_NAME = 'SET_NAME'

export const getUser = id => dispatch => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: id,
  })
  setTimeout(() => {
    console.log('get user by id - ' + id)
    dispatch({
      type: GET_USER_RESULT,
      payload: {
        name: 'test',
      },
    })
  }, 1000)
}

export const setName = name => {
  return {
    type: SET_NAME,
    payload: name,
  }
}
