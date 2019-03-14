import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
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

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: '#fff',
    color: '#3e424c',
    boxShadow: '1px 3px 13px 0px rgba(164, 167, 169, 0.3)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 4,
    marginRight: 30,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    paddingRight: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
  },
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22,
  },
  flexGrow: {
    flexGrow: 1,
  },
})

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
      const { classes } = this.props
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.openNavigate && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.openNavigate} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                className={classNames(classes.menuButton, this.state.openNavigate && classes.menuButtonHidden)}
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Dashboard
              </Typography>

              <div className={classes.flexGrow} />

              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={this.state.openNavigate}
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.openNavigate && classes.drawerPaperClose),
            }}
          >
            <div className={classes.toolbarIcon}>
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
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }

  MainLayoutComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  }

  return withStyles(styles)(MainLayoutComponent)
}
