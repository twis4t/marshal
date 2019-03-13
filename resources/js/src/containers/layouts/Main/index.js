import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'

export default function MainLayout(Component) {
  class MainLayoutComponent extends React.Component {
    render() {
      return (
        <div>
          <CssBaseline />
          <AppBar position="absolute">
            <Toolbar>
              <IconButton color="inherit" aria-label="Open drawer" onClick={() => true}>
                icon
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  icon
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={true}>
            <div>
              <IconButton onClick={() => true}>ert</IconButton>
            </div>
            <Divider />

            <Divider />
          </Drawer>
          <main>
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }

  return MainLayoutComponent
}
