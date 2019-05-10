import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
  AccountCircle as AccountCircleIcon,
  ListAlt as ListAltIcon,
} from '@material-ui/icons'
import Notifier from '@/components/Notifier'
import styles from './styles'
import Logo from '@/static/logo.svg'

export default function MainLayout(Component) {
  class MainLayoutComponent extends React.Component {
    state = {
      search: '',
    }

    handleDrawerOpen = () => {
      this.props.navBarVisible(true)
    }

    handleDrawerClose = () => {
      this.props.navBarVisible(false)
    }

    userLogOut = () => {
      this.props.logOut()
    }

    handleSearchChange = e => {
      const search = e.currentTarget.validity.valid ? e.currentTarget.value : this.state.search
      this.setState({ search: search })
    }

    ListItemLink = props => {
      return <ListItem button component="a" {...props} />
    }

    handleSearchSubmit = () => {
      if (this.state.search !== '') {
        this.props.push('/request/' + this.state.search)
        this.setState({ search: '' })
      }
    }

    searchKeyPress = e => {
      if (e.key === 'Enter') {
        this.handleSearchSubmit()
      }
    }

    render() {
      const { classes, user, settings, ...other } = this.props
      return (
        <div className={classes.root}>
          <CssBaseline />
          <Notifier />
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
                  <IconButton aria-label="Search" onClick={this.handleSearchSubmit}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </div>
                <InputBase
                  autoFocus
                  placeholder="Номер заявки.."
                  onChange={this.handleSearchChange}
                  value={this.state.search}
                  onKeyPress={this.searchKeyPress}
                  inputProps={{
                    pattern: '[0-9]*',
                  }}
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
              <ListItemLink to="/users" primary="Пользователи" icon={<AccountCircleIcon />} />
              <ListItemLink to="/requests" primary="Заявки" icon={<ListAltIcon />} />
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
            <ReactCSSTransitionGroup
              transitionName="anim"
              transitionAppear={true}
              transitionAppearTimeout={300}
              transitionEnter={false}
              transitionLeave={false}
            >
              <Component {...other} />
            </ReactCSSTransitionGroup>
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
    push: PropTypes.func.isRequired,
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
    push: path => dispatch(push(path)),
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MainLayoutComponent))
}
