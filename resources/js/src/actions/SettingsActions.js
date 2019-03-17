export const NAVBAR_VISIBLE_CHANGE = 'NAVBAR_VISIBLE_CHANGE'

export const navBarVisible = visible => ({
  type: NAVBAR_VISIBLE_CHANGE,
  payload: {
    navBarOpen: visible,
  },
})
