import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_SHOPS_REQUEST = 'GET_SHOPS_REQUEST'
export const GET_SHOPS_SUCCESS = 'GET_SHOPS_SUCCESS'
export const GET_SHOPS_ERROR = 'GET_SHOPS_ERROR'

export const EDIT_SHOP_REQUEST = 'EDIT_SHOPS_REQUEST'
export const EDIT_SHOP_SUCCESS = 'EDIT_SHOPS_SUCCESS'
export const EDIT_SHOP_ERROR = 'EDIT_SHOPS_ERROR'

export const ADD_SHOP_REQUEST = 'ADD_SHOP_REQUEST'
export const ADD_SHOP_SUCCESS = 'ADD_SHOP_SUCCESS'
export const ADD_SHOP_ERROR = 'ADD_SHOP_ERROR'

export const ARCHIVE_SHOP_REQUEST = 'ARCHIVE_SHOP_REQUEST'
export const ARCHIVE_SHOP_SUCCESS = 'ARCHIVE_SHOP_SUCCESS'
export const ARCHIVE_SHOP_ERROR = 'ARCHIVE_SHOP_ERROR'

export const SET_CATEGORIES_SHOP_REQUEST = 'SET_CATEGORIES_SHOP_REQUEST'
export const SET_CATEGORIES_SHOP_SUCCESS = 'SET_CATEGORIES_SHOP_SUCCESS'
export const SET_CATEGORIES_SHOP_ERROR = 'SET_CATEGORIES_SHOP_ERROR'

export const GET_SHOP_STAFF_REQUEST = 'GET_SHOP_STAFF_REQUEST'
export const GET_SHOP_STAFF_SUCCESS = 'GET_SHOP_STAFF_SUCCESS'
export const GET_SHOP_STAFF_ERROR = 'GET_SHOP_STAFF_ERROR'

export const getShops = () => async dispatch => {
  dispatch({
    type: GET_SHOPS_REQUEST,
  })

  axios
    .get('/shops')
    .then(res => {
      dispatch({
        type: GET_SHOPS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_SHOPS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список магазинов',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get shops data failed', e)
    })
}

export const editShop = (id, data) => async dispatch => {
  dispatch({
    type: EDIT_SHOP_REQUEST,
  })

  const fields = {
    name: data.name,
    description: data.description,
    address: data.address,
    phone: data.phone,
    comment: data.comment,
  }

  await axios
    .put('/shop-update/' + id, fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: EDIT_SHOP_SUCCESS,
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
          type: EDIT_SHOP_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: EDIT_SHOP_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось сохранить изменения',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Edit shop data failed', e)
    })
}

export const addShop = data => async dispatch => {
  dispatch({
    type: ADD_SHOP_REQUEST,
  })

  const fields = {
    name: data.name,
    description: data.description,
    address: data.address,
    phone: data.phone,
    comment: data.comment,
  }

  await axios
    .post('/shop-add', fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: ADD_SHOP_SUCCESS,
          payload: { insertedId: res.data.result.id },
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
          type: ADD_SHOP_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: ADD_SHOP_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось добавить компанию',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Add shop failed', e)
    })
}

export const archiveShop = (id, date) => async dispatch => {
  dispatch({
    type: ARCHIVE_SHOP_REQUEST,
  })

  await axios
    .put('/shop-update/' + id, { archive_date: date })
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: ARCHIVE_SHOP_SUCCESS,
        })
        dispatch(
          enqueueSnackbar({
            message: 'Статус компании изменен',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: ARCHIVE_SHOP_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: ARCHIVE_SHOP_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось изменить статус компании',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Archive date change failed', e)
    })
}

export const setCategories = (id, categories) => async dispatch => {
  dispatch({
    type: SET_CATEGORIES_SHOP_REQUEST,
  })

  await axios
    .put('/shop-set-categories/' + id, { categories: JSON.stringify(categories) })
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: SET_CATEGORIES_SHOP_SUCCESS,
        })
        dispatch(
          enqueueSnackbar({
            message: 'Категории установлены',
            options: {
              variant: 'success',
            },
          })
        )
      } else {
        dispatch({
          type: SET_CATEGORIES_SHOP_ERROR,
        })
      }
    })
    .catch(e => {
      dispatch({
        type: SET_CATEGORIES_SHOP_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось установить категории',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Set shop categories failed', e)
    })
}

export const getShopStaff = id => async dispatch => {
  dispatch({
    type: GET_SHOP_STAFF_REQUEST,
  })

  await axios
    .get('/shop-staff', { params: { id: id } })
    .then(res => {
      dispatch({
        type: GET_SHOP_STAFF_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_SHOP_STAFF_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список сотрудников',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get shop staff failed', e)
    })
}
