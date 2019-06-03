import { NAVBAR_VISIBLE_CHANGE } from '@/actions/SettingsActions'

const initialState = {
  lang: 'ru',
  appName: 'Marshal service',
  navBarOpen: true,
}

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVBAR_VISIBLE_CHANGE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
