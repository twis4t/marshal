import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
/* actions */
import { getUser } from '@/actions/UserActions'

import ModuleTitle from '@/components/ModuleTitle'
import Trend from 'react-trend'

import { Paper, Grid, Avatar, Typography, IconButton } from '@material-ui/core'
import {
  ListAlt as ListAltIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  AccountCircle as AccountCircleIcon,
  Message as MessageIcon,
  Forum as ForumIcon,
} from '@material-ui/icons'
import styles from './styles'
//import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

class App extends Component {
  infoBox = (title, value, icon, action, trend) => {
    trend = trend || {}
    const classes = this.props.classes
    return (
      <Paper className={classes.paperCard}>
        <div className={classes.infoBox}>
          <div>
            <Avatar className={classes.iconAvatar}>{icon}</Avatar>
          </div>
          <div>
            <Typography className={classes.infoBoxValue} variant="h4" gutterBottom>
              {value}
            </Typography>
            <div>{title}</div>
          </div>
          <div className={classes.flexGrow} />
          {action ? (
            <IconButton className={classes.infoBoxActionButton} aria-label="More" onClick={() => action()}>
              <KeyboardArrowRightIcon />
            </IconButton>
          ) : (
            ''
          )}
        </div>
        <div>
          <Trend
            smooth
            autoDraw
            autoDrawDuration={700}
            autoDrawEasing="ease-out"
            data={trend.data}
            gradient={trend.gradient}
            radius={25}
            strokeWidth={3.3}
            strokeLinecap={'round'}
          />
        </div>
      </Paper>
    )
  }

  render() {
    //const { classes } = this.props
    return (
      <div className="App">
        <ModuleTitle title="Главная" />

        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            {this.infoBox('Заявок создано', '1540', <ListAltIcon />, () => true, {
              data: [0, 12, 5, 9, 16, 2, 1, 14, 5],
              gradient: ['#1374dc', '#42b3f4'],
            })}
          </Grid>
          <Grid item xs={12} md={3}>
            {this.infoBox('Пользователей зарегистрировано', '235', <AccountCircleIcon />, () => true, {
              data: [0, 2, 3, 8, 1, 0, 8, 1, 3],
              gradient: ['#ff9800', '#ffc107'],
            })}
          </Grid>
          <Grid item xs={12} md={3}>
            {this.infoBox('Сообщений написано', '6875', <MessageIcon />, null, {
              data: [0, 12, 5, 9, 16, 2, 1, 14, 5],
              gradient: ['#8bc34a', '#a0e253'],
            })}
          </Grid>
          <Grid item xs={12} md={3}>
            {this.infoBox('Откликов отправлено', '2453', <ForumIcon />, null, {
              data: [0, 1, 12, 0, 8, 9, 4, 14, 21],
              gradient: ['#ff5722', '#ff7043'],
            })}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: (email, password) => dispatch(getUser(email, password)),
})

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
