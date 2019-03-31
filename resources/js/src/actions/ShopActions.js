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

  axios
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

  axios
    .post('/shop-add', fields)
    .then(res => {
      if (res.data.result) {
        dispatch({
          type: ADD_SHOP_SUCCESS,
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
