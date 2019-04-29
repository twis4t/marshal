import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FullSizeLoader from '@/components/FullSizeLoader'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
})

class UserForm extends React.Component {
  state = {
    defaultFields: {
      name: '',
      email: '',
      password: '',
      role_id: 1,
      shop_id: 0,
    },
    status: false,
    isNew: true,
    fields: {},
    loader: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.status !== state.status) {
      if (props.isNew === false) {
        return {
          status: props.status,
          isNew: props.isNew,
          fields: props.data,
        }
      } else {
        return {
          status: props.status,
          isNew: props.isNew,
          fields: state.defaultFields,
        }
      }
    }
    return null
  }

  componentDidMount = () => {
    this.setState({ fields: this.state.defaultFields })
  }

  handleFormClose = () => {
    this.setState({ fields: this.state.defaultFields })
    this.props.onClose()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    const currentFields = this.state.fields
    this.setState({
      fields: {
        ...currentFields,
        [name]: value,
      },
    })
  }

  handleFormSubmit = async () => {
    this.setState({ loader: true })
    await this.props.onSubmit(this.state.fields)
    this.setState({ loader: false })
    this.handleFormClose()
  }

  render() {
    const { status, classes } = this.props
    return (
      <div>
        <Dialog
          open={status}
          onClose={this.handleFormClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.isNew ? 'Добавить' : 'Редактировать'} пользователя
          </DialogTitle>
          <DialogContent>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Имя (ФИО)*"
                  variant="outlined"
                  id="name"
                  name="name"
                  value={this.state.fields.name}
                  autoComplete="name"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  label="Email*"
                  autoComplete="email"
                  variant="outlined"
                  name="email"
                  id="email"
                  value={this.state.fields.email}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  label="Пароль"
                  variant="outlined"
                  id="password"
                  name="password"
                  value={this.state.fields.password || ''}
                  autoComplete="password"
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" variant="outlined" fullWidth>
                <InputLabel htmlFor="role_id">Роль</InputLabel>
                <Select
                  value={this.state.fields.role_id}
                  onChange={this.handleInputChange}
                  input={<OutlinedInput labelWidth={40} name="role_id" id="role_id" />}
                >
                  {this.props.roles.map(role => (
                    <MenuItem key={'role-' + role.id} value={role.id}>
                      {role.role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
            <DialogContentText id="alert-dialog-description">
              * Помечены поля, обязательные для заполнения
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleFormClose} color="secondary" autoFocus>
              Отмена
            </Button>
            <Button onClick={this.handleFormSubmit} color="primary" autoFocus>
              {this.state.isNew ? 'Добавить' : 'Сохранить'}
            </Button>
          </DialogActions>
          {this.state.loader ? <FullSizeLoader enable={true} /> : ''}
        </Dialog>
      </div>
    )
  }
}

UserForm.propTypes = {
  status: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
}

export default withStyles(styles, { withTheme: true })(UserForm)
