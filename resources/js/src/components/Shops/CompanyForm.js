import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
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

class CompanyForm extends React.Component {
  state = {
    defaultFields: {
      name: '',
      description: '',
      address: '',
      phone: '',
      comment: '',
    },
    status: false,
    isNew: true,
    fields: {},
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

  handleFormSubmit = () => {
    this.setState({ fields: this.state.defaultFields })
    this.props.onSubmit(this.state.fields)
    this.props.onClose()
  }

  render() {
    const { status, onClose, classes } = this.props
    return (
      <div>
        <Dialog
          open={status}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Добавить компанию</DialogTitle>
          <DialogContent>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Наименование*"
                  variant="outlined"
                  id="name"
                  name="name"
                  value={this.state.fields.name}
                  autoComplete="organization"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  label="Описание"
                  variant="outlined"
                  name="description"
                  id="description"
                  value={this.state.fields.description}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Адрес*"
                  variant="outlined"
                  id="address"
                  name="address"
                  value={this.state.fields.address}
                  autoComplete="street-address"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Телефон*"
                  variant="outlined"
                  id="phone"
                  name="phone"
                  value={this.state.fields.phone}
                  autoComplete="tel"
                  autoFocus
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  label="Комментарий"
                  variant="outlined"
                  name="comment"
                  id="comment"
                  value={this.state.fields.comment}
                  onChange={this.handleInputChange}
                />
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
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

CompanyForm.propTypes = {
  status: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(CompanyForm)
