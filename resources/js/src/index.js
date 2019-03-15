import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from '@/store/configureStore'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import routes from '@/routes'

const store = configureStore()

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
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
