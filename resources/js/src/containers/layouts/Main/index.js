import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '@/actions/UserActions'
import { navBarVisible } from '@/actions/SettingsActions'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ListItemLink from '@/components/listitemlink'
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Badge,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ExitToApp as ExitToAppIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  Store as StoreIcon,
  Search as SearchIcon,
} from '@material-ui/icons'
import styles from './styles'
import Logo from '@/static/logo.svg'

export default function MainLayout(Component) {
  class MainLayoutComponent extends React.Component {
    handleDrawerOpen = () => {
      this.props.navBarVisible(true)
    }

    handleDrawerClose = () => {
      this.props.navBarVisible(false)
    }

    userLogOut = () => {
      this.props.logOut()
    }

    ListItemLink = props => {
      return <ListItem button component="a" {...props} />
    }

    render() {
      const { classes, user, settings, ...other } = this.props
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, settings.navBarOpen && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {settings.appName}
              </Typography>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Поиск.."
                  classes={{
                    root: classes.searchInputRoot,
                    input: classes.searchInputInput,
                  }}
                />
              </div>

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
            open={settings.navBarOpen}
            classes={{
              paper: classNames(classes.drawerPaper, !settings.navBarOpen && classes.drawerPaperClose),
            }}
          >
            <div className={classes.toolbarIconBox}>
              {settings.navBarOpen ? (
                <div className={classes.toolbarLogoBox}>
                  <img src={Logo} alt="Logo" width="120px" />
                  {/* <StarIcon /> <div className={classes.toolbarLogo}>МАРШАЛ</div> */}
                </div>
              ) : (
                ''
              )}
              <IconButton
                className={classes.toolbarIcon}
                onClick={settings.navBarOpen ? this.handleDrawerClose : this.handleDrawerOpen}
              >
                {settings.navBarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItemLink to="/" primary="Главная" icon={<HomeIcon />} />
              <ListItemLink to="/shops" primary="Магазины" icon={<StoreIcon />} />
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <NotificationsIcon /> : <MenuIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <div className={classes.flexGrow} />
            <List>
              <ListItem button onClick={this.userLogOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Выход" secondary={user.email} />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Component {...other} />
          </main>
        </div>
      )
    }
  }

  MainLayoutComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    navBarVisible: PropTypes.func.isRequired,
  }

  const mapStateToProps = store => {
    return {
      user: store.user,
      settings: store.settings,
    }
  }

  const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
    navBarVisible: visible => dispatch(navBarVisible(visible)),
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MainLayoutComponent))
}
