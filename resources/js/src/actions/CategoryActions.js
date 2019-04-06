import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR'

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_ERROR = 'ADD_CATEGORY_ERROR'

export const EDIT_CATEGORY_REQUEST = 'EDIT_CATEGORIES_REQUEST'
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORIES_SUCCESS'
export const EDIT_CATEGORY_ERROR = 'EDIT_CATEGORIES_ERROR'

export const REMOVE_CATEGORY_REQUEST = 'REMOVE_CATEGORY_REQUEST'
export const REMOVE_CATEGORY_SUCCESS = 'REMOVE_CATEGORY_SUCCESS'
export const REMOVE_CATEGORY_ERROR = 'REMOVE_CATEGORY_ERROR'

export const getCategories = () => async dispatch => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
  })

  await axios
    .get('/categories')
    .then(res => {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_CATEGORIES_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список категорий',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get categories data failed', e)
    })
}

export const addCategory = data => async dispatch => {
  dispatch({
    type: ADD_CATEGORY_REQUEST,
  })

  const fields = {
    category: data.category,
  }

  await axios
    .post('/category-add', fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload: res.data.result,
        })
        dispatch(
          enqueueSnackbar({
            message: 'Компания добавлена',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: ADD_CATEGORY_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: ADD_CATEGORY_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось добавить категорию',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Add category failed', e)
    })
}

export const editCategory = (id, data) => async dispatch => {
  dispatch({
    type: EDIT_CATEGORY_REQUEST,
  })

  const fields = {
    category: data.category,
  }

  await axios
    .put('/category-update/' + id, fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: EDIT_CATEGORY_SUCCESS,
          payload: data,
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
          type: EDIT_CATEGORY_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: EDIT_CATEGORY_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось изменить категорию',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Edit category failed', e)
    })
}

export const removeCategory = id => async dispatch => {
  dispatch({
    type: REMOVE_CATEGORY_REQUEST,
  })

  await axios
    .delete('/category-detele/' + id)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: REMOVE_CATEGORY_SUCCESS,
          payload: { id: id },
        })
        dispatch(
          enqueueSnackbar({
            message: 'Категория удалена',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: REMOVE_CATEGORY_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: REMOVE_CATEGORY_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось удалить категорию',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Remove category failed', e)
    })
}
