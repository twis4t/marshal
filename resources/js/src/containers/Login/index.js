import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import classNames from 'classnames'
import { getUser } from '@/actions/UserActions'
import Notifier from '@/components/Notifier'
import { Star as StarIcon } from '@material-ui/icons'

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

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 3px 6px 0px rgba(115, 127, 136, 0.3)',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.marshal.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  mainColorBg: {
    backgroundColor: theme.palette.marshal.main,
    '&:hover': {
      backgroundColor: theme.palette.marshal.dark,
    },
  },
  progress: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
})

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
