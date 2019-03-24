import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import classNames from 'classnames'
import { getUser } from '@/actions/UserActions'
import Notifier from '@/components/Notifier'
import { Star as StarIcon } from '@material-ui/icons'
import styles from './styles'

import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Paper,
  Typography,
  withStyles,
  LinearProgress,
} from '@material-ui/core'

export class Login extends React.Component {
  state = {
    email: '',
    password: '',
    remember: true,
  }

  onEmailChange = e => {
    this.setState({ email: e.currentTarget.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.currentTarget.value })
  }

  getUser(email, password) {
    this.props.getUser(email, password)
  }

  render() {
    const { classes, user } = this.props
    if (user.isAuth) return <Redirect to="/" />
    return (
      <div>
        {user.isFetching ? <LinearProgress className={classes.progress} color="secondary" /> : ''}
        <Notifier />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <StarIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Авторизация
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Email Адрес"
                  variant="outlined"
                  id="email"
                  name="email"
                  value={this.state.email}
                  autoComplete="email"
                  autoFocus
                  onChange={this.onEmailChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Пароль"
                  variant="outlined"
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  autoComplete="current-password"
                  onChange={this.onPasswordChange}
                />
              </FormControl>
              <FormControlLabel control={<Checkbox value="remember" color="secondary" />} label="Запомнить меня" />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classNames(classes.submit, classes.mainColorBg)}
                onClick={() => {
                  this.getUser(this.state.email, this.state.password)
                }}
              >
                {user.isFetching ? 'Загрузка...' : 'Войти'}
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: (email, password) => dispatch(getUser(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))
