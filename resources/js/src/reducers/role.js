import { GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_ERROR } from '@/actions/RoleActions'

const initialState = {
  roles: [],
  isFetching: false,
}

export const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Получение */
    case GET_ROLES_REQUEST:
      return { ...state, isFetching: true }
    case GET_ROLES_SUCCESS:
      return { ...state, roles: [...action.payload], isFetching: false }
    case GET_ROLES_ERROR:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
