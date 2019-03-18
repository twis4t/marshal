import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from '@/store/configureStore'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '@/theme/muiTheme'
import { SnackbarProvider } from 'notistack'
import routes from '@/routes'

const store = configureStore()

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
