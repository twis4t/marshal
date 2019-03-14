import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
} from '@material-ui/core'
import { LockOpen as LockOpenIcon } from '@material-ui/icons'

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
})

export class Login extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
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
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Пароль"
                variant="outlined"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="secondary" />} label="Запомнить меня" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classNames(classes.submit, classes.mainColorBg)}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
