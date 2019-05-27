import axios from '@/axios'
import { enqueueSnackbar } from './NotistackActions'

export const GET_BANNERS_REQUEST = 'GET_BANNSERS_REQUEST'
export const GET_BANNERS_SUCCESS = 'GET_BANNSERS_SUCCESS'
export const GET_BANNERS_ERROR = 'GET_BANNSERS_ERROR'

export const UPLOAD_BANNERS_REQUEST = 'UPLOAD_BANNSERS_REQUEST'
export const UPLOAD_BANNERS_SUCCESS = 'UPLOAD_BANNSERS_SUCCESS'
export const UPLOAD_BANNERS_ERROR = 'UPLOAD_BANNSERS_ERROR'

export const REMOVE_BANNER_REQUEST = 'REMOVE_BANNER_REQUEST'
export const REMOVE_BANNER_SUCCESS = 'REMOVE_BANNER_SUCCESS'
export const REMOVE_BANNER_ERROR = 'REMOVE_BANNER_ERROR'

export const getBanners = () => async dispatch => {
  dispatch({
    type: GET_BANNERS_REQUEST,
  })

  await axios
    .get('/banners')
    .then(res => {
      dispatch({
        type: GET_BANNERS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: GET_BANNERS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось получить список баннеров',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Get banners list failed', e)
    })
}

export const removeBanner = id => async dispatch => {
  dispatch({
    type: REMOVE_BANNER_REQUEST,
  })

  await axios
    .delete('/banner-delete/' + id)
    .then(res => {
      dispatch({
        type: REMOVE_BANNER_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: REMOVE_BANNER_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось удалить баннер',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Remove banner failed', e)
    })
}

export const uploadBanners = data => async dispatch => {
  dispatch({
    type: UPLOAD_BANNERS_REQUEST,
  })

  await axios
    .post('/banner-add', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      dispatch({
        type: UPLOAD_BANNERS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(e => {
      dispatch({
        type: UPLOAD_BANNERS_ERROR,
      })
      dispatch(
        enqueueSnackbar({
          message: 'Не удалось загрузить файлы',
          options: {
            variant: 'error',
          },
        })
      )
      console.log('Upload banners failed', e)
    })
}
