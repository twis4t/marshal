import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    marshal: {
      light: '#d43434',
      main: '#bf2424',
      dark: '#a51c1c',
    },
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#18202c',
        borderRight: 'none !important',
        '& *': { color: 'rgba(255, 255, 255, 0.8)' },
      },
    },
  },
})

export default theme
