import React from 'react'
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'

export default function MainLayout(Component) {
  class MainLayoutComponent extends React.Component {
    state = {
      openNavigate: false,
    }
    handleDrawerOpen = () => {
      this.setState({ openNavigate: true })
    }

    handleDrawerClose = () => {
      this.setState({ openNavigate: false })
    }
    render() {
      return (
        <div>
          <CssBaseline />
          <AppBar position="absolute">
            <Toolbar disableGutters={!this.state.openNavigate}>
              <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={this.state.openNavigate}>
            <div>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <NotificationsIcon /> : <MenuIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
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
