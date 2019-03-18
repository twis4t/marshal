import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    marshal: {
      light: '#f95245',
      main: '#F44336',
      dark: '#e2372b',
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
