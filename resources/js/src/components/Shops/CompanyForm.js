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
  defaultFields = {
    name: '',
    description: '',
    address: '',
    phone: '',
    comment: '',
  }
  state = {
    //
  }

  componentDidMount = () => {
    this.setState(this.defaultFields)
  }

  handleFormClose = () => {
    this.setState(this.defaultFields)
    this.props.onClose()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleFormSubmit = () => {
    this.setState({ ...this.defaultFields })
    this.props.onSubmit(this.state)
  }

  render() {
    console.log('form render')
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
                  value={this.state.name}
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
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Адрес*"
                  variant="outlined"
                  id="address"
                  name="address"
                  value={this.state.address}
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
                  value={this.state.phone}
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
                  value={this.state.comment}
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
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(CompanyForm)
